const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());
const port = 3001;

// Set up CORS middleware to allow requests from localhost:3000
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Replace "YOUR_API_KEY" with your actual OpenAI API key
const apiKey = "";

// Replace "YOUR_ASSISTANT_ID" with the ID of your assistant
const assistantId = "asst_zpYkcSHyNuLbtebUMAY9RFYq";

// Initialize the OpenAI library with your API key
const openai = new OpenAI(apiKey);

// Define a route to handle POST requests at the root endpoint
app.post("/", async (req, res) => {
    try {
        // Assuming the prompt is sent in the request body
        const { prompt } = req.body;

        // Create a thread for the conversation
        const thread = await openai.beta.threads.create();

        // Create a message in the thread with the user's prompt
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: prompt,
        });

        // Create a run in the thread with the assistant, including instructions
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
            instructions: "Please address the user as Voyager.",
        });

        // Function to check the status of the run and send messages
        const checkStatusAndSendMessages = async (threadId, runId) => {
            let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
            if (runStatus.status === "completed") {
                let messages = await openai.beta.threads.messages.list(threadId);
                res.json(messages.data); // Send the messages as JSON response
            } else {
                res.json({ message: "Run is not completed yet." });
            }
        };

        // Wait for some time, then check the status and send messages
        setTimeout(() => {
            checkStatusAndSendMessages(thread.id, run.id);
        }, 10000);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
