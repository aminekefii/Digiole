import React, { useState } from "react";
import { Flex, Input, Button, Box } from "@chakra-ui/react";

export default function ChatBot() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const HTTP = "http://localhost:8080/testchat";

    const handleMessageSubmit = async () => {
        setLoading(true);
    
        const userMessage = { text: prompt, role: 'user' }; // Change 'isUser' to 'role' to align with OpenAI's API
    
        try {
            const response = await fetch(HTTP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: [...messages, userMessage] }), // Send current state messages along with new user message
            });
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            
            // Assuming your backend responds with an array of messages including the new one from the assistant.
            const updatedMessages = [...messages, userMessage]; // Add user message to local state
            if (data.response && data.response.length) {
                updatedMessages.push(...data.response.map(msg => ({ text: msg.content, role: 'assistant' }))); // Add bot messages to local state
            }
    
            setMessages(updatedMessages);
        } catch (error) {
            console.error("Error sending message:", error.message);
        } finally {
            setLoading(false);
            setPrompt(""); // Reset prompt after processing the submission
        }
    };
    

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
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
                        className={message.isUser ? "user-message" : "bot-message"}
                        bg={message.isUser ? "#f2f2f2" : "#4caf50"}
                        color={message.isUser ? "black" : "white"}
                        alignSelf={message.isUser ? "flex-end" : "flex-start"}
                        margin="5px 0"
                        padding="10px"
                        borderRadius="10px"
                        maxWidth={message.isUser ? "60%" : "50%"}
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
            </Flex>
        </Flex>
    );
}
