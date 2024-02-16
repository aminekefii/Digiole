import React, { useState } from "react";
import axios from "axios";
import { Flex, Input, Button, Box } from "@chakra-ui/react";
import VoiceRec from "./VoiceRec";

export default function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const HTTP = "http://localhost:8080/testchat";

  const handleMessageSubmit = async () => {
    const response = await axios.post(HTTP, { prompt });
    setMessages([
      ...messages,
      { text: prompt, isUser: true },
      { text: response.data, isUser: false },
    ]);
    setPrompt(""); // Reset the input field
  };
  

  const handlePromptChange = (note) => {
    setPrompt(note);
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Box className="chat" height="50vh" width="80%" overflowY="scroll" padding="10px">
        {messages.map((message, index) => (
          <Box
            key={index}
            className={message.isUser ? "user-message" : "bot-message"}
            bg={message.isUser ? "#f2f2f2" : "#4caf50"}
            color={message.isUser ? "black" : "white"}
            alignSelf={message.isUser ? "flex-end" : "flex-start"}
            margin="5px 0"
            padding="10px"
            borderRadius="10px"
            maxWidth={message.isUser ? "60%" : "50%"}
            wordWrap="break-word"
          >
            {message.text}
          </Box>
        ))}
      </Box>
      <Flex
        direction="row"
        align="center"
        justify="center"
        className="input-container"
        height="20vh"
        padding="10px"
      >
        <VoiceRec handleNoteChange={handlePromptChange} />
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          width="350px"
          height="30px"
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
