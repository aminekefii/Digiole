const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const fsPromises = require("fs").promises;
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { spawn } = require("child_process");
const helmet = require('helmet');

dotenv.config();

const app = express();

// Enable CORS for your front-end
const corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));
app.use(express.json());



app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://accounts.google.com/gsi/client"],
      frameSrc: ["'self'", "https://accounts.google.com/gsi/"],
      connectSrc: ["'self'", "https://accounts.google.com/gsi/"]
      // Add other directives as needed
    }
  }
}));




const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const threadByUser = {}; // Store thread IDs by user

async function getOrCreateAssistant() {
  const assistantFilePath = "./voyager_assistant.json";

  try {
    const assistantData = await fsPromises.readFile(assistantFilePath, "utf8");
    const assistantDetails = JSON.parse(assistantData);
    console.log("\nExisting Voyager assistant detected.\n");
    return assistantDetails.assistantId;
  } catch (error) {
    // If file does not exist or there is an error in reading it, create a new Voyager assistant
    console.log("No existing Voyager assistant detected, creating new.\n");

    const assistantConfig = {
      name: "Voyager",
      instructions: `You are Voyager, a helpful assistant leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning based on your startup's stage and needs.
      Rules:
      1-start the conversation with this message "Hello, Hello, i am voyager ,iam here to help you and gide you to create you buissness plan, so let's start  !, feel free to upload any file to help us create your business plan by clicking the upload button"
      2-if the user uploads a file, retrieve information from this file to help him create a business plan.
      3-if the user didn't upload a file, respond with "umm great, let's start creating your business plan based on our knowledge".
      4-to create a business plan, you must ask the user and get answers for these questions based on the uploaded file or the user response:
      What is the name of your business?
      Where is your business located?
      What is the legal structure of your business?
      Can you provide a brief description of what your company does?
      What is the mission of your company?
      What problem does your company solve for your customers?
      What result does your company create for your customers?
      How does your company create that result?
      Who are the target customers of your company?
      What is the motivation behind what your company does?
      Why should customers choose your company over your competition?
      Can you describe your proprietary system?
      What are the demographics of your target market?
      What are the psychographics of your target market?
      What is the estimated size of your target market?
      Where can your target market be found?
      What is your strategy for increasing visibility (brand awareness)?
      What is your lead generation strategy?
      What is your conversion strategy?
      What is your primary product?
      What result does your primary product aim to achieve?
      What impact does your primary product have on customers?
      What is your production system?
      What is your delivery system?
      What are your one-year goals for revenue?
      What are your one-year goals for profit?
      What are your one-year goals for sales?
      What is the expected impact of your one-year goals?
      What are your one-year goals for development?
      What are your five-year goals?
      5-ask each time a question and wait for the user response before passing the next question.
6-if the user uploaded a file before you ask all the questions try to find answers for these questions in the provided files 
7-if you find answer for all the questions ask again the user if he have other files to add or any information.`,
      tools: [
        { type: "code_interpreter" }, // Code interpreter tool
        { type: "retrieval" }, // Retrieval tool
      ],
      model: "gpt-4-turbo",
    };

    const assistant = await openai.beta.assistants.create(assistantConfig);
    const assistantDetails = { assistantId: assistant.id, ...assistantConfig };

    // Save the Voyager assistant details to voyager_assistant.json
    await fsPromises.writeFile(
      assistantFilePath,
      JSON.stringify(assistantDetails, null, 2)
    );

    return assistant.id;
  }
}




// Import Firebase admin SDK to verify Firebase ID tokens

var admin = require("firebase-admin");

var serviceAccount = require("./voyager-4d279-firebase-adminsdk-q9dfx-2145fe62b7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://voyager-4d279.appspot.com"
});

const db = admin.firestore();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.+)$/); // Regex to extract token

  if (!match) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = match[1];

  try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
  } catch (error) {
      console.error("Error verifying ID token:", error);
      res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};










// Enhance the existing chat endpoint to handle file retrieval and download
app.post("/chat", verifyToken, async (req, res) => {
  const userId = req.user.uid;
  // Create a new thread if it's the user's first message
  if (!threadByUser[userId]) {
    try {
      const myThread = await openai.beta.threads.create();
      console.log("New thread created with ID: ", myThread.id, "\n");
      threadByUser[userId] = myThread.id; // Store the thread ID for this user

      // Save the thread details to a JSON file
      const threadDetails = { threadId: myThread.id };
      const threadFilePath = "./thread_details.json";
      await fsPromises.writeFile(threadFilePath, JSON.stringify(threadDetails, null, 2));

/* Save the message to Firestore
const threadRef = db.collection('threads').doc(threadId);
await threadRef.update({
  messages: admin.firestore.FieldValue.arrayUnion(myThreadMessage)
});
*/

      
    } catch (error) {
      console.error("Error creating thread:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }



// Function to upload thread details JSON to Firebase Storage
const uploadThreadDetailsToStorage = async () => {
  try {
    const filePath = "./thread_details.json"; // Path to your thread details JSON file
    const bucket = admin.storage().bucket();

    // Upload the file to Firebase Storage
    await bucket.upload(filePath, {
      destination: "thread_details.json" // Destination path in Firebase Storage
    });

    console.log("Thread details JSON uploaded to Firebase Storage successfully.");
  } catch (error) {
    console.error("Error uploading thread details JSON:", error);
  }
};

// Call the function to upload thread details JSON to Firebase Storage
uploadThreadDetailsToStorage();



  const userMessage = req.body.message;

  try {
    const assistantIdToUse = await getOrCreateAssistant();

    // Add a Message to the Thread
    const myThreadMessage = await openai.beta.threads.messages.create(
      threadByUser[userId], // Use the stored thread ID for this user
      {
        role: "user",
        content: userMessage,
      }
    );
    console.log("This is the message object: ", myThreadMessage, "\n");

    // Run the Assistant
    const myRun = await openai.beta.threads.runs.create(
      threadByUser[userId], // Use the stored thread ID for this user
      {
        assistant_id: assistantIdToUse,
        instructions: `You are Voyager, a helpful assistant leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning based on your startup's stage and needs.
        Rules:
        1-start the conversation with this message "Hello, Hello, i am voyager ,iam here to help you and gide you to create you buissness plan, so let's start  !, feel free to upload any file to help us create your business plan by clicking the upload button"
        2-if the user uploads a file, retrieve information from this file to help him create a business plan.
        3-if the user didn't upload a file, respond with "umm great, let's start creating your business plan based on our knowledge".
        4-to create a business plan, you must ask the user and get answers for these questions based on the uploaded file or the user response:
        What is the name of your business?
        Where is your business located?
        What is the legal structure of your business?
        Can you provide a brief description of what your company does?
        What is the mission of your company?
        What problem does your company solve for your customers?
        What result does your company create for your customers?
        How does your company create that result?
        Who are the target customers of your company?
        What is the motivation behind what your company does?
        Why should customers choose your company over your competition?
        Can you describe your proprietary system?
        What are the demographics of your target market?
        What are the psychographics of your target market?
        What is the estimated size of your target market?
        Where can your target market be found?
        What is your strategy for increasing visibility (brand awareness)?
        What is your lead generation strategy?
        What is your conversion strategy?
        What is your primary product?
        What result does your primary product aim to achieve?
        What impact does your primary product have on customers?
        What is your production system?
        What is your delivery system?
        What are your one-year goals for revenue?
        What are your one-year goals for profit?
        What are your one-year goals for sales?
        What is the expected impact of your one-year goals?
        What are your one-year goals for development?
        What are your five-year goals?
        5-ask each time a question and wait for the user response before passing the next question.
  6-if the user uploaded a file before you ask all the questions try to find answers for these questions in the provided files 
  7-if you find answer for all the questions ask again the user if he have other files to add or any information.
        `,
        tools: [
          { type: "code_interpreter" }, // Code interpreter tool
          { type: "retrieval" }, // Retrieval tool
        ],
      }
    );
    console.log("This is the run object: ", myRun, "\n");

    // Periodically retrieve the Run to check its status
    const retrieveRun = async () => {
      let keepRetrievingRun;

      while (myRun.status !== "completed") {
        keepRetrievingRun = await openai.beta.threads.runs.retrieve(
          threadByUser[userId], // Use the stored thread ID for this user
          myRun.id
        );

        console.log(`Run status: ${keepRetrievingRun.status}`);

        if (keepRetrievingRun.status === "completed") {
          console.log("\n");
          break;
        }
      }
    };
    retrieveRun();

    // Retrieve the messages added by the Assistant to the Thread
    const waitForAssistantMessage = async () => {
      await retrieveRun();

      const allMessages = await openai.beta.threads.messages.list(
        threadByUser[userId] // Use the stored thread ID for this user
      );

      // Check if the assistant provided a link
      const assistantResponse = allMessages.data[0].content[0].text.value;
      const linkRegex = /(https?:\/\/[^\s]+)/;

      // If a link is found, include it in the response
      let response = assistantResponse;
      const linkMatch = assistantResponse.match(linkRegex);
      if (linkMatch) {
        response += ` Download your file <a href="${linkMatch[0]}">here</a>`;
      }

      // Send the response back to the front end
      res.status(200).json({
        response,
      });
      console.log(
        "------------------------------------------------------------ \n"
      );

      console.log("User: ", myThreadMessage.content[0].text.value);
      console.log("Assistant: ", response);
    };
    waitForAssistantMessage();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





// File upload functionality
const uploadFolder = path.join(__dirname, './');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder); 
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).single('file');


app.post('/upload', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    try {
      const fileName = req.file.filename;
      
      // Load assistant details from file
      const assistantFilePath = "./voyager_assistant.json";
      const assistantData = await fsPromises.readFile(assistantFilePath, "utf8");
      const assistantDetails = JSON.parse(assistantData);

      // Upload the file to OpenAI
      const file = await openai.files.create({
        file: fs.createReadStream(fileName),
        purpose: "assistants",
      });

      // Retrieve existing file IDs from assistantDetails or initialize to an empty array
      let existingFileIds = assistantDetails.file_ids || [];

      // Update the assistant with the new file ID
      await openai.beta.assistants.update(assistantDetails.assistantId, {
        file_ids: [...existingFileIds, file.id],
      });

      // Update local assistantDetails and save to assistant.json
      assistantDetails.file_ids = [...existingFileIds, file.id];
      await fsPromises.writeFile(
        assistantFilePath,
        JSON.stringify(assistantDetails, null, 2)
      );

      console.log("File uploaded and successfully added to assistant\n");

      // Send the file ID back to the frontend
      res.status(200).json({ fileId: file.id });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });
});









// Route to process files using Python script
app.post("/process-files", async (req, res) => {
  try {
    // Read the JSON file containing thread details
    const threadFilePath = "./thread_details.json";
    const threadDetails = JSON.parse(fs.readFileSync(threadFilePath, "utf8"));

    // Extract the thread ID
    const { threadId } = threadDetails;

    // Execute the Python script with the extracted thread ID
    const pythonProcess = spawn("python", [
      "./download.py",
      threadId,
    ]);

    // Event handlers for Python process
    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        res.status(200).json({ message: "Files processed successfully" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
