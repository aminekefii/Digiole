import React, { useState, useEffect, useContext } from 'react';
import { Flex, Image, Heading, Text, Box } from '@chakra-ui/react';
import TextToSpeech from 'services/api/TextToSpeech';
import { AuthContext } from '../contexts/authContext';
import "../../styles/linebreak.css";

const ChatContent = ({ messages }) => {
  const filteredMessages = messages.filter((message, index) => {
    if (index === 0 && message.role === 'user') {
      return false; 
    }
    return true;
  });

  const { currentUser } = useContext(AuthContext);
  const [photoURL, setPhotoURL] = useState(process.env.PUBLIC_URL + "/images/Profilepic.png");

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <Flex w="100%" h="calc(100vh - 150px)" overflowY="scroll" flexDirection="column" p="4" >
      {filteredMessages.map((message, index) => (
        <Flex key={index} mt="4" flexDirection="column">
          <Flex gap="2" alignItems="center">
            {message.role === 'assistant' ? (
              <Image src="images/img_voyager_icon2.svg" h="20px" w="20px" />
            ) : (
              <Image src={photoURL} borderRadius="50%" h="20px" w="20px" />
            )}
            <Heading as="h3" size="sm">{message.role === 'assistant' ? 'Voyager' : 'You'}</Heading>
          </Flex>
          <Text mt="2" className='display-linebreak' color="black">
            {message.text}
            {message.role === 'assistant' && <TextToSpeech text={message.text} />}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default ChatContent;
