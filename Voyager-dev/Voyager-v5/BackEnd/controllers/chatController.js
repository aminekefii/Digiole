const OpenAI = require("openai");
const dotenv = require('dotenv');
const { spawn } = require("child_process");

const { saveThreadID } = require('../utils/threadUtils');
const admin = require("firebase-admin");
const fsPromises = require("fs").promises;
const fs = require("fs");

dotenv.config();


const path = require("path");

const uploadFolder = path.join(__dirname, '../uploads');
const downloadFolder = path.join(__dirname, '../downloads');
const assistantFilePath = path.join(__dirname, '../voyager_assistant.json');

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
      1-start the conversation with this message "Hello, Hello, I am Voyager, I am here to help you and guide you to create your business plan, so let's start! Feel free to upload any file to help us create your business plan by clicking the upload button."
      2-if the user uploads a file, retrieve information from this file to help them create a business plan.
      3-if the user didn't upload a file, respond with "umm great, let's start creating your business plan based on our knowledge."
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
6-if the user uploaded a file before you ask all the questions, try to find answers for these questions in the provided files.
7-if you find answers for all the questions, ask again if the user has other files to add or any additional information.`,
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

const startChat = async (req, res) => {
    const userId = req.user.uid;
    if (!threadByUser[userId]) {
        try {
            const myThread = await openai.beta.threads.create();
            console.log("New thread created with ID:", myThread.id);
            threadByUser[userId] = myThread.id;


            // Save the chat to Firebase
            const chatRef = admin.firestore().collection('chat').doc(userId).collection('threads').doc(myThread.id);
            await chatRef.set({ messages: [] });

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
            threadByUser[userId],
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

        // retrieve the Run and check its status
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

            // Check if the assistant generate a file
            const assistantResponse = allMessages.data[0].content[0].text.value;
            const annotations = allMessages.data[0].content[0].text.annotations
            console.log("annotations: ", annotations);

            const pythonProcess = spawn("python", [
                "./MessageContent.py",
                JSON.stringify({ assistantResponse, annotations }), // Pass annotations as JSON string
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

                    res.status(200).json({
                        response: processedResponse,
                    });

                    console.log(
                        "------------------------------------------------------------ \n"
                    );

                    console.log("User: ", myThreadMessage.content[0].text.value);
                    console.log("Assistant: ", processedResponse);

                    // Save cht to Firebase
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
};

s
const getThreads = async (req, res) => {
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
};

const getChatHistory = async (req, res) => {
    try {
        const uid = req.user.uid;
        const { threadId } = req.params;
        //chat history 
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
};

const deleteThread = async (req, res) => {
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
};

const deleteAssistantAndFiles = async (req, res) => {
    try {
        const assistantData = JSON.parse(fs.readFileSync(assistantFilePath, 'utf8'));
        const assistantId = assistantData.assistantId;
        const fileIds = assistantData.file_ids || [];

        console.log(`Deleting assistant with ID: ${assistantId}`);
        const response = await openai.beta.assistants.del(assistantId);
        console.log(response);

        for (const fileId of fileIds) {
            try {
                console.log(`Deleting file with ID: ${fileId}`);
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

            let uploadDeletions = uploadFiles.map(uploadFile => {
                return new Promise((resolve, reject) => {
                    fs.unlink(path.join(uploadFolder, uploadFile), err => {
                        if (err) {
                            console.error('Error deleting upload file:', err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            Promise.all(uploadDeletions)
                .then(() => {
                    fs.readdir(downloadFolder, (err, downloadFiles) => {
                        if (err) {
                            console.error('Error reading downloads directory:', err);
                            return res.status(500).send('Internal Server Error');
                        }

                        let downloadDeletions = downloadFiles.map(downloadFile => {
                            return new Promise((resolve, reject) => {
                                fs.unlink(path.join(downloadFolder, downloadFile), err => {
                                    if (err) {
                                        console.error('Error deleting download file:', err);
                                        reject(err);
                                    } else {
                                        resolve();
                                    }
                                });
                            });
                        });

                        Promise.all(downloadDeletions)
                            .then(() => {
                                fs.unlink(assistantFilePath, err => {
                                    if (err) {
                                        console.error('Error deleting voyager_assistant.json:', err);
                                        return res.status(500).send('Internal Server Error');
                                    }

                                    console.log('voyager_assistant.json file deleted successfully');
                                    res.status(200).send('Files deleted successfully');
                                });
                            })
                            .catch(downloadErr => {
                                console.error('Error deleting files from downloads directory:', downloadErr);
                                res.status(500).send('Internal Server Error');
                            });
                    });
                })
                .catch(uploadErr => {
                    console.error('Error deleting files from uploads directory:', uploadErr);
                    res.status(500).send('Internal Server Error');
                });
        });
    } catch (err) {
        console.error('Error processing delete-files request:', err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    startChat,
    getOrCreateAssistant,
    getThreads,
    getChatHistory,
    deleteThread,
    deleteAssistantAndFiles

};
