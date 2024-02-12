import { Flex, VStack, Spacer, Box, Text, HStack } from "@chakra-ui/layout";
import { Button, Grid, GridItem, IconButton } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar";
import { Stack } from '@chakra-ui/layout';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from "react";
import VoiceRec from "../components/VoiceRec";



const BuisnessChat = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm Voyager! Ask me anything!",
            sentTime: "just now",
            sender: "Voyager"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        setIsTyping(true);
       
    };
    const [note, setNote] = useState("");

    return (


        <Stack w="100%" minH="100vh">
            <Grid templateColumns="1fr 6fr" mt="30px" w="100%">
                <Sidebar />
                <GridItem as="main" p="40px" height="100%" w="100%">
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={isTyping ? <TypingIndicator content="Voyager is typing" /> : null}
                            >
                                {messages.map((message, i) => {
                                    console.log(message)
                                    return <Message key={i} model={message} />
                                })}
                            </MessageList>
                            <MessageInput attachButton={false} placeholder="Type message here" onSend={handleSend}/>
                        </ChatContainer>
                    </MainContainer>
                 
                    <VoiceRec setNote={setNote} />
            
                </GridItem>
            </Grid>
        </Stack>


    );
}

export default BuisnessChat;