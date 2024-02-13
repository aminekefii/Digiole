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
      <Flex direction="column" align="center" justify="center" className="chat">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "user-message" : "bot-message"}
          >
            {message.text}
          </div>
        ))}
      </Flex>
      <Flex direction="row" align="center" justify="center" className="input-container">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleMessageSubmit}>Send</Button>
      </Flex>
    </Flex>
  );
}

export default BuisinessChatContainer;
