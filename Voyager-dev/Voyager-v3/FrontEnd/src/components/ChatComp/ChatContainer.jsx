import React, { useState, useEffect, useContext } from "react";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import ChatContent from "./ChatContent";
import ChatInputGroup from "./ChatInput";
import { AuthContext } from '../contexts/authContext/index';

const ChatContainer = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  // Access currentUser user
  const { currentUser } = useContext(AuthContext);

  const handleMessageSubmit = async () => {
    if (!prompt.trim()) return;  // Avoid sending empty messages
    setLoading(true);

    try {
      const token = await currentUser.getIdToken(true); // Ensure token is refreshed

      const userMessage = { text: prompt, role: 'user' };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: currentUser.uid, message: prompt }),
      };

      const response = await fetch('http://localhost:3000/chat', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages([...messages, userMessage, { text: data.response, role: 'assistant' }]);
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

  useEffect(() => {
    if (!initialMessageSent && currentUser) {
      sendInitialMessage();
      setInitialMessageSent(true);
    }
  }, [initialMessageSent, currentUser]);

  const sendInitialMessage = async () => {
    setLoading(true);
    const initialMessage = "Hello";

    try {
      const token = await currentUser.getIdToken(true);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: currentUser.uid, message: initialMessage }),
      };

      const response = await fetch('http://localhost:3000/chat', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages([{ text: initialMessage, role: 'user' }, { text: data.response, role: 'assistant' }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      flexDirection="column"
      height="70vh"
      width={{ base: "100%", md: "95%" }}
      mx="auto"
      justifyContent="space-between"
      position="relative"
      p="4"
      bg="gray.100"
      borderRadius="md"
      boxShadow="md"
    >
      <Box flex="1" w="100%" overflowY="auto" p="4" bg="white" borderRadius="md" boxShadow="sm">
        {loading && (
          <Flex justify="center" mb="4">
            <Spinner />
          </Flex>
        )}
        <ChatContent messages={messages} />
      </Box>
      <ChatInputGroup
        prompt={prompt}
        setPrompt={setPrompt}
        handleKeyDown={handleKeyDown}
        handleMessageSubmit={handleMessageSubmit}
      />
    </Flex>
  );
};

export default ChatContainer;
