const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const fsPromises = require("fs").promises;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Enable CORS for your front-end
const corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));
app.use(express.json());

const openai = new OpenAI({
  apiKey: "", // Replace with your OpenAI API key
});

const threadByUser = {}; // Store thread IDs by user

async function getOrCreateAssistant() {
  const assistantFilePath = "./voyager_assistant.json";

  try {
    const assistantData = await fsPromises.readFile(
      assistantFilePath,
      "utf8"
    );
    const assistantDetails = JSON.parse(assistantData);
    console.log("\nExisting Voyager assistant detected.\n");
    return assistantDetails.assistantId;
  } catch (error) {
    // If file does not exist or there is an error in reading it, create a new Voyager assistant
    console.log("No existing Voyager assistant detected, creating new.\n");
    const assistantConfig = {
      name: "Voyager",
      instructions:
        "You are speaking to Voyager, a helpful assistant leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning based on your startup's stage and needs.",
      tools: [
        { type: "code_interpreter" }, // Code interpreter tool
        { type: "retrieval" }, // Retrieval tool
      ],
      model: "gpt-3.5-turbo-0125",
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

app.post("/chat", async (req, res) => {
  const userId = req.body.userId; // You should include the user ID in the request

  // Create a new thread if it's the user's first message
  if (!threadByUser[userId]) {
    try {
      const myThread = await openai.beta.threads.create();
      console.log("New thread created with ID: ", myThread.id, "\n");
      threadByUser[userId] = myThread.id; // Store the thread ID for this user
    } catch (error) {
      console.error("Error creating thread:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }

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
        instructions: "You are speaking to Voyager, a helpful assistant leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning based on your startup's stage and needs.", // Include the assistant name and description in the instructions
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

      // Send the response back to the front end
      res.status(200).json({
        response: allMessages.data[0].content[0].text.value,
      });
      console.log(
        "------------------------------------------------------------ \n"
      );

      console.log("User: ", myThreadMessage.content[0].text.value);
      console.log("Assistant: ", allMessages.data[0].content[0].text.value);
    };
    waitForAssistantMessage();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// File upload functionality
const uploadFolder = path.join(__dirname, './uploads');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder); // Specify the destination folder
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
}).single('file');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }
    console.log(req.body);
    console.log(req.file);
    res.send('File uploaded successfully');
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
