import OpenAI from "openai";

// Remplacez "YOUR_API_KEY" par votre propre clé API OpenAI
const apiKey = "";

// Remplacez "YOUR_ASSISTANT_ID" par l'identifiant de votre assistant
const assistantId = "asst_5jAUQ4ZSIb1j4cX1q5EqReOG";

// Initialisez la bibliothèque OpenAI avec votre clé API
const openai = new OpenAI(apiKey);

(async () => {
    try {
        // Créez un assistant avec les informations nécessaires
        const assistant = await openai.beta.assistants.create({
            name: "Math Tutor",
            instructions: "You are a personal math tutor. Write and run code to answer math questions.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-3.5-turbo",
        });

        // Créez un fil de discussion
        const thread = await openai.beta.threads.create();

        // Créez un message dans le fil de discussion avec le rôle de l'utilisateur
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: "I need to solve the equation `3x + 11 = 14`. Can you help me?",
        });

        // Créez un exécution de fil de discussion avec l'assistant ID
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
            instructions: "Please address the user as Mervin Praison.",    
        });

        console.log(run);

        // Fonction pour vérifier le statut de l'exécution et afficher les messages
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

        // Attendre un certain temps puis vérifier le statut et afficher les messages
        setTimeout(() => {
            checkStatusAndPrintMessages(thread.id, run.id);
        }, 10000);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
