import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Button, Image, Text } from '@chakra-ui/react';

const ChatHistory = () => {
  return (
    <Flex mt="16px" gap="18px" w={{ md: "24%", base: "100%" }} flexDirection="column" alignItems="start">
      <Box
        ml={{ md: "4px", base: "0px" }}
        pb={{ base: "20px", sm: "21px" }}
        pr={{ base: "20px", sm: "21px" }}
        borderColor="blue_gray.400_5b"
        borderBottomWidth="1px"
        borderStyle="solid"
        alignSelf="stretch"
      >
        <Button
         as={Link}
         to="/assistants"
          size="2xl"
          variant="outline"
          colorScheme="indigo_900"
          rightIcon={<Image src="images/img_news.svg" />}
          gap="35px"
          w="100%"
          borderRadius="8px"
          px={{ base: "20px", sm: "" }}
        >
          Explore other assistants
        </Button>
      </Box>
    <Box>
    <Button
  as={Link}
  to=""
  size="2xl"
  variant="outline"
  colorScheme="indigo_900"
  h="30px"
  gap="35px"
  w="150px"
  borderRadius="8px"
  px={{ base: "20px", sm: "" }}
  onClick={() => window.location.reload()}
>
  New chat
</Button>

      </Box>
   
    </Flex>
  );
};

export default ChatHistory;
