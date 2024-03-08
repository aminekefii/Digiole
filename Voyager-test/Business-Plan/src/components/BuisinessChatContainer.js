import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import "../chatContainer.css";
import VoiceRec from "./VoiceRec";
import { sendMessageToOpenAI } from "../axios";

function BuisinessChatContainer() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleNoteChange = (note) => {
    setInput(note);
  };


  const handleMessageSubmit = async () => {
    const response = await sendMessageToOpenAI(input);
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: response, isUser: false },
    ]);
    setInput("");
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
        <div className="user-message">user message</div>
        <div className="bot-message">bot message</div>
        <div className="user-message">user message</div>
        <div className="bot-message">bot message</div>
        <div className="user-message">user message</div>
        <div className="bot-message">bot message</div>
        <div className="user-message">user message</div>
        <div className="bot-message">bot message</div>
        <div className="user-message">user message</div>
        <div className="bot-message">bot message</div>
        <div className="user-message">user message</div>
        <div className="bot-message">bot message</div>
        <div className="user-message">user message</div>
        <div className="bot-message">bot message</div>
        <div className="user-message">user message</div>
        <div className="bot-message">bot message</div>


      </Flex>
      <Flex
        direction="row"
        align="center"
        justify="center"
        className="input-container"
        height="20%"
        padding="10px"
      >
        <VoiceRec handleNoteChange={handleNoteChange} />

        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          width="80%"
          padding="10px"
          borderRadius="5px"
          border="1px solid green"
          outline="none"
        />
        <Button
          onClick={handleMessageSubmit}
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