import React from 'react';
import { Flex, Image, Heading, Text, Box } from '@chakra-ui/react';
import TextToSpeech from 'services/api/TextToSpeech';

const ChatContent = ({ messages }) => {
  return (
    <Flex     w="100%"  height="50vh" overflowY="scroll"
    >
<Box
  ml={{ md: "34px", base: "0px" }}
  justifyContent="space-between"
  alignItems="center"
  gap="20px"
  flexDirection="column"
>
  {messages.map((message, index) => (
    <Flex
      key={index}
      mt="12px"
      gap="23px"
      w={{ md: "71%", base: "100%" }}
      flexDirection="column"
    >
      <Flex gap="4px" alignItems="center">
        {message.role === 'assistant' ? (
          <Image src="images/img_voyager_icon.svg" h="17px" alignSelf="end" w="16px" />
        ) : (
          <Image src="images/img_avatar.png" h="17px" alignSelf="end" w="16px" />
        )}
        <Heading as="h1">{message.role === 'assistant' ? 'Voyager' : 'User'}</Heading>
      </Flex>

      <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%">
        {message.text}
        {message.role === 'assistant' && (
          <TextToSpeech text={message.text} />
        )}
      </Text>
    </Flex>
  ))}
</Box>


    </Flex>
  );
};

export default ChatContent;
