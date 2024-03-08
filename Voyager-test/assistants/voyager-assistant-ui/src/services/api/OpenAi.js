import OpenAI from "openai";

// Replace "YOUR_API_KEY" with your actual OpenAI API key
const apiKey = "YOUR_API_KEY";

// Replace "YOUR_ASSISTANT_ID" with the ID of your assistant
const assistantId = "asst_zpYkcSHyNuLbtebUMAY9RFYq";

// Initialize the OpenAI library with your API key
const openai = new OpenAI(apiKey);

(async () => {
    try {
        // Create an assistant with the necessary information, including instructions
        const assistant = await openai.beta.assistants.create({
            name: "voyager",
            instructions: "You are Voyager, a helpful assistant providing tailored advice on startup ecosystems.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-3.5-turbo",
        });

        // Create a thread for the conversation
        const thread = await openai.beta.threads.create();

        // Create a message in the thread with the user's prompt
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: "What are the key principles for developing startup ecosystems and how can they be effectively implemented to foster growth and success?",
        });

        // Create a run in the thread with the assistant, including instructions
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
            instructions: "Please address the user as Voyager.",    
        });

        console.log(run);

        // Function to check the status of the run and print messages
        const checkStatusAndPrintMessages = async (threadId, runId) => {
            let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
            if(runStatus.status === "completed"){
                let messages = await openai.beta.threads.messages.list(threadId);
                messages.data.forEach((msg) => {
                    const role = msg.role;
                    const content = msg.content[0].text.value; 
                    console.log(
                        `${role.charAt(0).toUpperCase() + role.slice(1)}: ${content}`
                    );
                });
            } else {
                console.log("Run is not completed yet.");
            }  
        };

        // Wait for some time, then check the status and print messages
        setTimeout(() => {
            checkStatusAndPrintMessages(thread.id, run.id);
        }, 10000);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
