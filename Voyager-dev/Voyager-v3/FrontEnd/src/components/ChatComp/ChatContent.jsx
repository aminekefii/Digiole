import React from 'react';
import { Flex, Image, Heading, Text, Box } from '@chakra-ui/react';
import TextToSpeech from 'services/api/TextToSpeech';
import { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebase';
import { AuthContext } from '../contexts/authContext';
const ChatContent = ({ messages }) => {
  // Filter out the first user message ("Hello")
  const filteredMessages = messages.filter((message, index) => {
    if (index === 0 && message.role === 'user') {
      return false; // Skip the first user message
    }
    return true;
  });

  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
const [loading, setLoading] = useState(false);
const [photoURL, setPhotoURL] = useState(process.env.PUBLIC_URL + "/images/Profilepic.png");

useEffect(() => {
  if (currentUser?.photoURL) {
    setPhotoURL(currentUser.photoURL);
  }
}, [currentUser])

  return (
    <Flex w="100%" height="50vh" overflowY="scroll">
      <Box
        ml={{ md: '34px', base: '0px' }}
        justifyContent="space-between"
        alignItems="center"
        gap="20px"
        flexDirection="column"
      >
        {filteredMessages.map((message, index) => (
          <Flex
            key={index}
            mt="20px"
            gap="10px"
            w={{ md: '71%', base: '100%' }}
            flexDirection="column"
          >
            <Flex gap="4px" alignItems="center">
              {message.role === 'assistant' ? (
                <Image src="images/img_voyager_icon2.svg" h="17px" alignSelf="end" w="16px" />
              ) : (
                <Image src={photoURL} borderRadius="50%" h="20px" w="20px" />
              )}
              <Heading as="h1">{message.role === 'assistant' ? 'Voyager' : 'You'}</Heading>
            </Flex>

            <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%" mt="8px">
              {message.text}
              {message.role === 'assistant' && <TextToSpeech text={message.text} />}
            </Text>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export default ChatContent;