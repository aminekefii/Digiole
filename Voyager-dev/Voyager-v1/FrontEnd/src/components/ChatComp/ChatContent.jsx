import React from 'react';
import { Flex, Image, Heading, Text, Box } from '@chakra-ui/react';

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
            <Image src="images/img_settings_black_900.svg" h="16px" alignSelf="end" w="16px" />
            <Heading as="h1">{message.role === 'assistant' ? 'Voyager' : 'User'}</Heading>
          </Flex>
          <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%">
            {message.text}
          </Text>
        </Flex>
      ))}
    </Box>
    </Flex>
  );
};

export default ChatContent;
