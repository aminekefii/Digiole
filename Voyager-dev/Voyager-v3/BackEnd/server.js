const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const multer = require("multer");
const { spawn } = require("child_process");
const helmet = require('helmet');
const admin = require("firebase-admin");
const { uploadThreadDetailsToStorage } = require('./firebaseUtils');

dotenv.config();
const app = express();

///////////////////////////////////////////////////////////////////////////////////////

// Initialize Firebase Admin SDK
var serviceAccount = require("./voyager-4d279-firebase-adminsdk-q9dfx-2145fe62b7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://voyager-4d279-default-rtdb.firebaseio.com",
  storageBucket: "gs://voyager-4d279.appspot.com"
});


///////////////////////////////////////////////////////////////////////////////////////

// Enable CORS 
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
     
    }
  }
}));


///////////////////////////////////////////////////////////////////////////////////////

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const threadByUser = {}; // Store thread IDs by user


///////////////////////////////////////////////////////////////////////////////////////


async function getOrCreateAssistant() {
  const assistantFilePath = "./voyager_assistant.json";

  try {
    const assistantData = await fsPromises.readFile(assistantFilePath, "utf8");
    const assistantDetails = JSON.parse(assistantData);
    console.log("\nExisting Voyager assistant detected.\n");
    return {
      assistantId: assistantDetails.assistantId,
      instructions: assistantDetails.instructions
    };
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

    return {
      assistantId: assistant.id,
      instructions: assistantConfig.instructions
    };
  }
}


///////////////////////////////////////////////////////////////////////////////////////



// Authentication and Firebase token verification middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token 
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; 
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////


const threadFilePath = "./thread_details.json";

const lockfile = require('proper-lockfile');

async function saveThreadID(newThreadID) {
    try {
        await lockfile.lock(threadFilePath);
        let threadDetails = { threadIds: [] };

        try {
            const data = await fsPromises.readFile(threadFilePath, "utf8");
            threadDetails = JSON.parse(data);
        } catch (error) {
            console.error("Error reading file:", error);
        }

        threadDetails.threadIds.push(newThreadID);
        await fsPromises.writeFile(threadFilePath, JSON.stringify(threadDetails, null, 2));
        console.log("Thread ID saved:", newThreadID);
    } catch (error) {
        console.error("Failed to save thread ID:", error);
    } finally {
        await lockfile.unlock(threadFilePath);
    }
}

/*
async function saveThreadID(newThreadID, userId) {
  try {
      // Create a reference to the Firestore collection where you want to save thread details
      const userThreadsRef = db.collection('user_threads').doc(userId);

      // Use Firestore transactions for atomic updates
      await db.runTransaction(async (transaction) => {
          const doc = await transaction.get(userThreadsRef);
          let threadDetails = doc.exists ? doc.data() : { threads: {} };

          // Save the new thread ID
          threadDetails.threads[newThreadID] = true;

          // Write the updated thread details back to Firestore
          transaction.set(userThreadsRef, threadDetails);
      });

      console.log("Thread ID saved:", newThreadID);
  } catch (error) {
      console.error("Failed to save thread ID:", error);
  }
}*/



///////////////////////////////////////////////////////////////////////////////////////

// Enhance the existing chat endpoint to handle file retrieval and download
app.post("/chat", verifyToken, async (req, res) => {
  const userId = req.user.uid;
  if (!threadByUser[userId]) {
    try {
      const myThread = await openai.beta.threads.create();
      console.log("New thread created with ID:", myThread.id);
      threadByUser[userId] = myThread.id;

      // Save the new thread ID and upload details to Storage
      //await saveThreadID(myThread.id); // Save the thread ID

      // Save the chat to Firebase
      const chatRef = admin.firestore().collection('chat').doc(userId).collection('threads').doc(myThread.id);
      await chatRef.set({ messages: [] }); // Initialize messages array

    } catch (error) {
      console.error("Error handling thread creation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  const userMessage = req.body.message;

  try {
    const assistantDetails = await getOrCreateAssistant();

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
        assistant_id: assistantDetails.assistantId,
        instructions: assistantDetails.instructions,
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

      // Save the user and assistant messages to Firebase
      const chatRef = admin.firestore().collection('chat').doc(userId).collection('threads').doc(threadByUser[userId]);
      await chatRef.update({
        messages: admin.firestore.FieldValue.arrayUnion(
          { role: "user", content: myThreadMessage.content[0].text.value },
          { role: "assistant", content: response }
        ),
      });
    };
    waitForAssistantMessage();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




///////////////////////////////////////////////////////////////////////////////////////
/*
// GET route for fetching chat history
app.get('/chatHistory/:uid/:threadId', async (req, res) => {
  try {
    const { uid, threadId } = req.params;

    // Retrieve the chat history for the specified user ID and thread ID from Firebase
    const chatRef = admin.firestore().collection('chat').doc(uid).collection('threads').doc(threadId);
    const chatData = await chatRef.get();

    if (!chatData.exists) {
      return res.status(404).json({ error: 'Chat history not found' });
    }

    const chatHistory = chatData.data().messages;

    res.json({ chatHistory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route for updating Firebase and sending data to OpenAI
app.post('/updateAndGenerate/:uid/:threadId', async (req, res) => {
  try {
    const { uid, threadId } = req.params;
    const { messages } = req.body;

    // Update Firebase with new messages for the specified user ID and thread ID
    const chatRef = admin.firestore().collection('chat').doc(uid).collection('threads').doc(threadId);
    await chatRef.update({
      messages: admin.firestore.FieldValue.arrayUnion(...messages), // Assuming messages is an array
    });

    // Send chat history to OpenAI for response generation
   /* const result = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages, // Send only the user messages to OpenAI
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Store the OpenAI response messages into Firebase
    const openAIResponse = result.choices.map((choice) => choice.message);
    await chatRef.update({
      messages: admin.firestore.FieldValue.arrayUnion(...openAIResponse),
    });

    // Retrieve the updated chat history from Firebase
    const updatedData = await chatRef.get();
    const updatedChatHistory = updatedData.data().messages;

    res.json({ updatedChatHistory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


*/

///////////////////////////////////////////////////////////////////////////////////////

// File upload functionality
const uploadFolder = path.join(__dirname, './uploads');
const storage = admin.storage().bucket();
const multerStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder); 
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).single('file');

app.post('/upload', verifyToken, async (req, res) => {
  const userId = req.user.uid; // Extract user ID from decoded token
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    try {
      const fileName = req.file.filename;
      const filePath = path.join(uploadFolder, fileName);

      // Save the file to Firebase Storage
      const firebaseStoragePath = `users/${userId}/uploadedFiles/${fileName}`;
      await storage.upload(filePath, {
        destination: firebaseStoragePath
      });

      // Load assistant details from file
      const assistantFilePath = "./voyager_assistant.json";
      const assistantData = await fsPromises.readFile(assistantFilePath, "utf8");
      const assistantDetails = JSON.parse(assistantData);

      // Upload the file to OpenAI
      const file = await openai.files.create({
        file: fs.createReadStream(filePath),
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
      res.status(200).json({ fileId: file.id, firebasePath: firebaseStoragePath });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });
});

/*
const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage for multer
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).single('file');


// Assuming `upload` middleware is defined elsewhere

app.post('/upload', verifyToken, async (req, res) => {
  const userId = req.user.uid; // Extract user ID from decoded token
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    try {
      const fileBuffer = req.file.buffer;
      const fileName = req.file.originalname;

      // Save the buffer as a file to Firebase Storage
      const bucket = admin.storage().bucket();
      const fileDestination = `users/${userId}/uploadedFiles/${Date.now()}_${fileName}`;
      const file = bucket.file(fileDestination);
      await file.save(fileBuffer, {
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      console.log('File uploaded to Firebase Storage');

      // Load assistant details from file
      const assistantFilePath = "./voyager_assistant.json";
      const assistantData = await fsPromises.readFile(assistantFilePath, "utf8");
      const assistantDetails = JSON.parse(assistantData);

      // Upload the file to OpenAI
      const openaiFile = await openai.files.create({
        file: fileBuffer, // Pass the buffer directly
        purpose: "assistants",
      });

      // Retrieve existing file IDs from assistantDetails or initialize to an empty array
      let existingFileIds = assistantDetails.file_ids || [];

      // Update the assistant with the new file ID
      await openai.beta.assistants.update(assistantDetails.assistantId, {
        file_ids: [...existingFileIds, openaiFile.id],
      });

      // Update local assistantDetails and save to assistant.json
      assistantDetails.file_ids = [...existingFileIds, openaiFile.id];
      await fsPromises.writeFile(
        assistantFilePath,
        JSON.stringify(assistantDetails, null, 2)
      );

      console.log("File uploaded and successfully added to assistant\n");

      // Send success response
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });
});*/
///////////////////////////////////////////////////////////////////////////////////////

app.get('/uploadedFiles', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid; // Extract user ID from decoded token
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: `users/${userId}/uploadedFiles/` });

    // Extract file names from the files array
    const fileNames = files.map(file => {
      return {
        name: file.name.split('/').pop(), // Extract only the file name from the full path
        url: `https://storage.googleapis.com/${bucket.name}/${file.name}` // Get the download URL for the file
      };
    });

    // Send the list of file names and download URLs as response
    res.status(200).json({ files: fileNames });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});


///////////////////////////////////////////////////////////////////////////////////////
const assistantFilePath = './voyager_assistant.json';

app.delete('/delete-files', (req, res) => {
  // Get the list of files in the uploads folder
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    // Iterate through the files in the uploads folder and delete them
    files.forEach(file => {
      fs.unlink(path.join(uploadFolder, file), err => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    });
    
    // Respond with a success message for the files in the uploads folder
    console.log('Files in the uploads folder deleted successfully');
  });

  // Delete the voyager_assistant.json file
  fs.unlink(assistantFilePath, err => {
    if (err) {
      console.error('Error deleting voyager_assistant.json:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    // Respond with a success message for the voyager_assistant.json file
    console.log('voyager_assistant.json file deleted successfully');
    res.status(200).send('Files deleted successfully');
  });
});

///////////////////////////////////////////////////////////////////////////////////////

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


///////////////////////////////////////////////////////////////////////////////////////

app.get('/threads', verifyToken, async (req, res) => {
  const userId = req.user.uid; // Extract user ID from decoded token

  try {
    // Query Firestore to fetch the threads associated with the current user
    const userThreadsSnapshot = await admin.firestore().collection('chat').doc(userId).collection('threads').get();
    
    const userThreads = [];
    userThreadsSnapshot.forEach(doc => {
      // Extract thread details from each document
      const threadData = doc.data();
      userThreads.push({
        threadId: doc.id,
        // Include any other relevant thread details
      });
    });
    
    // Return the list of threads as a response
    res.status(200).json({ threads: userThreads });
  } catch (error) {
    console.error("Error fetching user threads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


///////////////////////////////////////////////////////////////////////////////////////



// GET route for fetching chat history
app.get('/chatHistory/:threadId', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid; // Extract user ID from decoded token
    const { threadId } = req.params; // Get the threadId from the request parameters
    // Retrieve the chat history for the specified user ID and thread ID from Firebase
    const chatRef = admin.firestore().collection('chat').doc(uid).collection('threads').doc(threadId);
    const chatData = await chatRef.get();

    if (!chatData.exists) {
      return res.status(404).json({ error: 'Chat history not found' });
    }

    const chatHistory = chatData.data().messages;

    res.json({ chatHistory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






//////////////////////////////////////////////////////////////////////////////////////
/*
app.post('/threadDetails/:threadId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid; // Extract user ID from decoded token
    const { threadId } = req.params; // Get the threadId from the request parameters

    console.log("Threadid retrieved", threadId);
    console.log("User ID:", userId); // Log the user ID

    // Execute the Python script with the extracted thread ID
    const pythonProcess = spawn("python", [
      "./ThreadsRetrieve.py",
      threadId,
      userId, 
    ]);

    // Handle Python script events
    pythonProcess.on('close', (code) => {
      console.log(`Python script process exited with code ${code}`);
    });

    // Return the list of threads as a response
    res.status(200).json({ message: "Thread details sent to Python script" });
  } catch (error) {
    console.error("Error fetching user thread:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////
app.post('/receive_messages', (req, res) => {
  try {
    const { threadId, userId, thread_details, messages } = req.body;

    console.log("server: Thread ID:", threadId);
    console.log("server: User ID:", userId); // Log user ID
    console.log("server: Thread details:", thread_details);
    console.log("server: Messages:", messages);

    // Handle the received messages here

    // Prepare the response object
    const responseData = {
      message: "Data to frontend",
      thread_details: thread_details,
      messages: messages
    };

    // Send the response back to the client
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error receiving messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Endpoint to send messages to the frontend
app.get('/send_messages', (req, res) => {
  try {
    // Extract threadId, thread_details, and messages from query parameters
    const { threadId, thread_details, messages } = req.query;

    // Prepare the data to send to the frontend
    const dataToSendToFrontend = {
      threadId: threadId,
      threadDetails: JSON.parse(thread_details), // Convert string to object
      messages: JSON.parse(messages), // Convert string to object
      
    };
    console.log("send_messages: Thread details:", thread_details);

    // Send data to the frontend
    res.status(200).json(dataToSendToFrontend);
  } catch (error) {
    console.error("Error sending messages to frontend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

*/
///////////////////////////////////////////////////////////////////////////////////////




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});