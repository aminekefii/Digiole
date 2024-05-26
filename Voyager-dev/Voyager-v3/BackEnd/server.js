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
const { uploadThreadDetailsToStorage } = require('./firebase/firebaseUtils');

dotenv.config();
const app = express();

///////////////////////////////////////////////////////////////////////////////////////

// Initialize Firebase Admin SDK
var serviceAccount = require("./firebase/voyager-4d279-firebase-adminsdk-q9dfx-2145fe62b7.json");
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
        { type: "code_interpreter" }, 
        { type: "retrieval" }, 
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



// Authentication and Firebase token verification 
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
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

///////////////////////////////////////////////////////////////////////////////////////

app.post("/chat", verifyToken, async (req, res) => {
  const userId = req.user.uid;
  if (!threadByUser[userId]) {
      try {
          const myThread = await openai.beta.threads.create();
          console.log("New thread created with ID:", myThread.id);
          threadByUser[userId] = myThread.id;


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
          threadByUser[userId], 
          {
              role: "user",
              content: userMessage,
          }
      );
      console.log("This is the message object: ", myThreadMessage, "\n");

      // Run the Assistant
      const myRun = await openai.beta.threads.runs.create(
          threadByUser[userId], // Use the stored thread ID 
          {
              assistant_id: assistantDetails.assistantId,
              instructions: assistantDetails.instructions,
              tools: [
                  { type: "code_interpreter" }, 
                  { type: "retrieval" }, 
              ],
          }
      );
      console.log("This is the run object: ", myRun, "\n");

      // Periodically retrieve the Run to check its status
      const retrieveRun = async () => {
          let keepRetrievingRun;

          while (myRun.status !== "completed") {
              keepRetrievingRun = await openai.beta.threads.runs.retrieve(
                  threadByUser[userId], 
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
              threadByUser[userId] 
          );

          // Check if the assistant a file
          const assistantResponse = allMessages.data[0].content[0].text.value;
          const annotations = allMessages.data[0].content[0].text.annotations
          console.log("annotations: ", annotations);

          const pythonProcess = spawn("python", [
            "./MessageContent.py",
            JSON.stringify({ assistantResponse, annotations }), // Pass both response and annotations as JSON string
        ]);

          let processedResponse = "";
          pythonProcess.stdout.on('data', (data) => {
              processedResponse += data.toString();
          });

          pythonProcess.stderr.on('data', (data) => {
              console.error(`Error: ${data}`);
          });

          pythonProcess.on('close', async (code) => {
              if (code === 0) {
                  // Send the processed response back to the front end
                  res.status(200).json({
                      response: processedResponse,
                  });

                  console.log(
                      "------------------------------------------------------------ \n"
                  );

                  console.log("User: ", myThreadMessage.content[0].text.value);
                  console.log("Assistant: ", processedResponse);

                  // Save the user and assistant messages to Firebase
                  const chatRef = admin.firestore().collection('chat').doc(userId).collection('threads').doc(threadByUser[userId]);
                  await chatRef.update({
                      messages: admin.firestore.FieldValue.arrayUnion(
                          { role: "user", content: myThreadMessage.content[0].text.value },
                          { role: "assistant", content: processedResponse }
                      ),
                  });
              } else {
                  console.error(`Python process exited with code ${code}`);
                  res.status(500).json({ error: "Internal server error" });
              }
          });
      };

      waitForAssistantMessage().catch((error) => {
          console.error("Error:", error);
          res.status(500).json({ error: "Internal server error" });
      });

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});



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

      // Retrieve existing file IDs 
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


///////////////////////////////////////////////////////////////////////////////////////
const { Storage } = require('@google-cloud/storage');
const bucket = admin.storage().bucket();


app.get('/uploadedFiles', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const [files] = await bucket.getFiles({ prefix: `users/${userId}/uploadedFiles/` });

    const fileNames = await Promise.all(files.map(async (file) => {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2025' // You can set the expiry date accordingly
      });
      return {
        name: file.name.split('/').pop(),
        url: url
      };
    }));

    res.status(200).json({ files: fileNames });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

///////////////////////////////////////////////////////////////////////////////////////
app.delete('/deleteFirebasefile/:fileName', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid; // Extract user ID from decoded token
    const fileName = req.params.fileName;
    const filePath = `users/${userId}/uploadedFiles/${fileName}`;
    
    // Delete the file from Firebase Storage
    await admin.storage().bucket().file(filePath).delete();

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

///////////////////////////////////////////////////////////////////////////////////////


const assistantFilePath = './voyager_assistant.json';
const downloadFolder = './downloads';


app.delete('/delete-files', async (req, res) => {
  try {
    const assistantData = JSON.parse(fs.readFileSync(assistantFilePath, 'utf8'));
    const assistantId = assistantData.assistantId;
    const fileIds = assistantData.file_ids || [];

    const response = await openai.beta.assistants.del(assistantId);
    console.log(response);

    for (const fileId of fileIds) {
      try {
        const fileResponse = await openai.files.del(fileId);
        console.log(`File with ID ${fileId} deleted successfully`, fileResponse);
      } catch (fileErr) {
        console.error(`Error deleting file with ID ${fileId}:`, fileErr);
      }
    }

    fs.readdir(uploadFolder, (err, uploadFiles) => {
      if (err) {
        console.error('Error reading uploads directory:', err);
        return res.status(500).send('Internal Server Error');
      }

      uploadFiles.forEach(uploadFile => {
        fs.unlink(path.join(uploadFolder, uploadFile), err => {
          if (err) {
            console.error('Error deleting upload file:', err);
          }
        });
      });

      fs.readdir(downloadFolder, (err, downloadFiles) => {
        if (err) {
          console.error('Error reading downloads directory:', err);
          return res.status(500).send('Internal Server Error');
        }

        downloadFiles.forEach(downloadFile => {
          fs.unlink(path.join(downloadFolder, downloadFile), err => {
            if (err) {
              console.error('Error deleting download file:', err);
            }
          });
        });

        fs.unlink(assistantFilePath, err => {
          if (err) {
            console.error('Error deleting voyager_assistant.json:', err);
            return res.status(500).send('Internal Server Error');
          }

          console.log('voyager_assistant.json file deleted successfully');
          res.status(200).send('Files deleted successfully');
        });
      });
    });
  } catch (err) {
    console.error('Error processing delete-files request:', err);
    res.status(500).send('Internal Server Error');
  }
});


///////////////////////////////////////////////////////////////////////////////////////

// Route to process files using Python script
app.post("/process-files", async (req, res) => {
  try {
   
    const threadFilePath = "./thread_details.json";
    const threadDetails = JSON.parse(fs.readFileSync(threadFilePath, "utf8"));
    const { threadId } = threadDetails;
    const pythonProcess = spawn("python", [
      "./download.py",
      threadId,
    ]);

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

app.get('/downloads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '/downloads', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

app.get('/file-ready/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '/downloads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not available:', err);
      res.json({ ready: false, error: 'File not available' });
    } else {
      res.json({ ready: true });
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////


app.get('/threads', verifyToken, async (req, res) => {
  const userId = req.user.uid; 

  try {
    const userThreadsSnapshot = await admin.firestore().collection('chat').doc(userId).collection('threads').get();
    
    const userThreads = [];
    userThreadsSnapshot.forEach(doc => {
  
      const threadData = doc.data();
      userThreads.push({
        threadId: doc.id,
     
      });
    });
    
    res.status(200).json({ threads: userThreads });
  } catch (error) {
    console.error("Error fetching user threads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


///////////////////////////////////////////////////////////////////////////////////////

app.delete('/threads/:threadId', verifyToken, async (req, res) => {
  const userId = req.user.uid; 
  const { threadId } = req.params; 

  try {
    
    const threadRef = admin.firestore().collection('chat').doc(userId).collection('threads').doc(threadId);
    
    const threadDoc = await threadRef.get();
    if (!threadDoc.exists) {
      return res.status(404).json({ error: "Thread not found" });
    }
    
    await threadRef.delete();
    
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error("Error deleting thread:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////


app.get('/chatHistory/:threadId', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid; 
    const { threadId } = req.params; 
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


///////////////////////////////////////////////////////////////////////////////////////


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});