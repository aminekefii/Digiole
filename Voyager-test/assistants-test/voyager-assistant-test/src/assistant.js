import OpenAI from "openai";

// Remplacez "YOUR_API_KEY" par votre propre clé API OpenAI
const apiKey = "";

// Remplacez "YOUR_ASSISTANT_ID" par l'identifiant de votre assistant
const assistantId = "asst_9fyQ7060fGulfskySPoEG5Xm";

// Initialisez la bibliothèque OpenAI 
const openai = new OpenAI(apiKey);

(async () => {
    try {
        // Créez un assistant 
        const assistant = await openai.beta.assistants.create({
            name: "voyager",
            instructions: "you are voyage a helpful assistant  as a personal advisor leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding , support services and strategic planning based on your startup's stage and needs.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-3.5-turbo",
        });

        // Créez un fil de discussion
        const thread = await openai.beta.threads.create();

        // Créez un message dans le fil de discussion avec le rôle de l'utilisateur
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: "What are the key principles for developing startup ecosystems and how can they be effectively implemented to foster growth and success?",
        });

        // Créez un exécution de fil de discussion avec l'assistant ID
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
            instructions: "Please address the user as voyager user.",    
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
