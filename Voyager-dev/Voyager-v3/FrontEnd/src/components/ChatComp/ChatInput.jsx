import React from 'react';
import { Flex, InputGroup, Input, Button, Image, Center } from '@chakra-ui/react';
import VoiceRec from './VoiceRec';
import FileUpload from 'services/api/FilesUpload';

const ChatInputGroup = ({ prompt, setPrompt, handleKeyDown, handleMessageSubmit }) => {

  const handlePromptChange = (note) => {
    setPrompt(note);
  };

  return (
    <Flex
      position="fixed"
      bottom="0"
      left={{ base: "0", md: "260px" }} // Adjust the left position to account for the sidebar width
      right="0"
      p="4"
      bg="white"
      alignItems="center"
      justifyContent="center"
      boxShadow="0 -2px 5px rgba(0,0,0,0.1)"
      zIndex="10" // Ensure it's above other elements
    >
      <VoiceRec handleNoteChange={handlePromptChange} />
      <InputGroup maxW="800px" flex="1" mx="4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Voyager..."
          pr={{ base: "0px", sm: "5px" }}
          h="50px"
          pt="5px"
          fontSize="15px"
        />
      </InputGroup>
      <Button
        onClick={handleMessageSubmit}
        padding="0"
        bg="transparent"
        border="none"
        outline="none"
        cursor="pointer"
        ml="4"
      >
        <Center w="20px" h="20px">
          <Image src="images/img_save.svg" />
        </Center>
      </Button>
      <FileUpload />
    </Flex>
  );
};

export default ChatInputGroup;
