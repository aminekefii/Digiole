const fsPromises = require("fs").promises;
const lockfile = require('proper-lockfile');

const saveThreadID = async (newThreadID) => {
  const threadFilePath = "./thread_details.json";
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
};

const getOrCreateAssistant = async () => {
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
    console.log("No existing Voyager assistant detected, creating new.\n");
    const assistantConfig = {
      name: "Voyager",
      instructions: `You are Voyager, a helpful assistant leveraging dedicated knowledge...`,
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-4-turbo",
    };
    const assistant = await openai.beta.assistants.create(assistantConfig);
    const assistantDetails = { assistantId: assistant.id, ...assistantConfig };
    await fsPromises.writeFile(assistantFilePath, JSON.stringify(assistantDetails, null, 2));
    return {
      assistantId: assistant.id,
      instructions: assistantConfig.instructions
    };
  }
};

module.exports = {
  saveThreadID,
  getOrCreateAssistant
};
