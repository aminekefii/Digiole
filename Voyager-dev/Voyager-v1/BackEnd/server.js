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
  apiKey: "", 
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
      instructions: `You are Voyager, a helpful assistant leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning based on your startup's stage and needs.
    Rules:
    1-start the conversation with this message "Hello , let's start creating your business plan , feel free to upload any file to help us create your business plan by clicking the upload button"
    2-if the user uploads a file, retrieve information from this file to help him create a business plan.
    3-if the user didn't upload a file, respond with "umm great, let's start creating your business plan based on our knowledge".
    3-to create a business plan, you must ask the user and get answers for these questions based on the uploaded file or the user response:
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
    4-ask each time a question and wait for the user response before passing the next question.`,
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

   /* // Upload the knowledge file once assistant is created
    const knowledgeFilePath = "./knowledge.txt";
    const knowledgeFileExists = fs.existsSync(knowledgeFilePath);

    if (!knowledgeFileExists) {
      throw new Error("Knowledge file does not exist.");
    }

    // Upload the knowledge file to OpenAI
    const knowledgeFile = await openai.files.create({
      file: fs.createReadStream(knowledgeFilePath),
      purpose: "assistants",
    });

    // Update the assistant with the knowledge file ID
    await openai.beta.assistants.update(assistant.id, {
      file_ids: [knowledgeFile.id],
    });

    console.log("Knowledge file uploaded and successfully added to assistant\n");*/

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
        instructions: `You are Voyager, a helpful assistant leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning based on your startup's stage and needs.
        Rules:
        1-start the conversation with this message "Hello , let's start creating your business plan , feel free to upload any file to help us create your business plan by clicking the upload button"
        2-if the user uploads a file, retrieve information from this file to help him create a business plan.
        3-if the user didn't upload a file, respond with "umm great, let's start creating your business plan based on our knowledge".
        3-to create a business plan, you must ask the user and get answers for these questions based on the uploaded file or the user response:
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
        4-ask each time a question and wait for the user response before passing the next question.`,
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
const uploadFolder = path.join(__dirname, './');

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
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).single('file');


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
        instructions: `You are Voyager, a helpful assistant leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning based on your startup's stage and needs.
        Rules:
        1-start the conversation with this message "Hello , let's start creating your business plan , feel free to upload any file to help us create your business plan by clicking the upload button"
        2-if the user uploads a file, retrieve information from this file to help him create a business plan.
        3-if the user didn't upload a file, respond with "umm great, let's start creating your business plan based on our knowledge".
        3-to create a business plan, you must ask the user and get answers for these questions based on the uploaded file or the user response:
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
        4-ask each time a question and wait for the user response before passing the next question.`,
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
        response += ` Here's the generated file: ${linkMatch[0]}`;
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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
