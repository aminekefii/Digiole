import { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

function BuisinessChatContainer() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = async () => {
    /*const response = await sendMessageToOpenAI(input);
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: response, isUser: false },
    ]);
    setInput("");*/
    console.log("sent");
  };

  return (
    <Flex direction="column" align="center" justify="center" className="App">
      <Flex
        direction="column"
        align="flex-start"
        justify="flex-start"
        className="chat"
        height="80%"
        overflowY="scroll"
        padding="10px"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "user-message" : "bot-message"}
          >
            {message.text}
          </div>
        ))}
      </Flex>
      <Flex direction="row" align="center" justify="center" className="input-container" height="20%" padding="10px">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          width="70%"
          padding="10px"
          borderRadius="5px"
          border="1px solid green"
          outline="none"
        />
        <Button
          onClick={handleMessageSubmit}
          width="20%"
          padding="10px"
          borderRadius="5px"
          border="none"
          outline="none"
          backgroundColor="#4caf50"
          color="white"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
}

export default BuisinessChatContainer;
