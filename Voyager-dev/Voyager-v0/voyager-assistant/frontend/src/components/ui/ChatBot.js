import React, { useState, useEffect } from "react";
import { Flex, Input, Button, Image, Heading, Text, Box, Container } from "@chakra-ui/react";
import FileUpload from "../../services/api/FilesUpload";
import VoiceRec from "./VoiceRec";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessageSubmit = async () => {
    setLoading(true);
    
    const userMessage = { text: prompt, role: 'user' };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'your_user_id', message: prompt }),
    };

    try {
      const response = await fetch('http://localhost:3000/chat', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages([...messages, { text: prompt, role: 'user' }, { text: data.response, role: 'assistant' }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const handlePromptChange = (note) => {
    setPrompt(note);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMessageSubmit();
    }
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Box className="chat" height="50vh" width="80%" overflowY="scroll" padding="10px">
        {messages.map((message, index) => (
          <Box
            key={index}
            className="message"
            bg={message.role === 'user' ? "#f2f2f2" : "#4caf50"}
            color={message.role === 'user' ? "black" : "white"}
            alignSelf={message.role === 'user' ? "flex-end" : "flex-start"}
            margin="5px 0"
            padding="10px"
            borderRadius="10px"
            maxWidth={message.role === 'user' ? "60%" : "50%"}
          >
            {message.text}
          </Box>
        ))}
      </Box>
      <Flex direction="row" align="center" justify="center" className="input-container" height="20vh" padding="10px">
        <VoiceRec handleNoteChange={handlePromptChange} />
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
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
          ml="10px"
        >
          Send
        </Button>
        <FileUpload />
      </Flex>
    </Flex>
  );
};

export default Chatbot;
