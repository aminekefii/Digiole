import React from 'react';
import { InputGroup, InputLeftElement, Input, InputRightElement, Image, Button, Center ,Flex} from '@chakra-ui/react';
import VoiceRec from './VoiceRec';
import FileUpload from 'services/api/FilesUpload';



const ChatInputGroup = ({ prompt, setPrompt, handleKeyDown, handleMessageSubmit }) => {

  const handlePromptChange = (note) => {
    setPrompt(note);
  };


  return (
    <Flex  bottom="50"
    position="fixed"
    width="30%"
   marginBottom="50px"
    backgroundColor="white"
   
    ml="10">
    <InputGroup
       
      >
        <InputLeftElement width="20%">
          <VoiceRec handleNoteChange={handlePromptChange} />
        </InputLeftElement>
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`| Message Voyager...`}
          pr={{ base: "20px", sm: 0 }}
          h="50px"
          pt="5px"
          ml="10px"
          fontSize="15px"
        />
        <InputRightElement>
          <Button
            onClick={handleMessageSubmit}
            padding="0"
            bg="transparent"
            border="none"
            outline="none"
            cursor="pointer"
          >
            <Center w="20px" h="20px">
              <Image src="images/img_save.svg" />
            </Center>
          </Button>
        </InputRightElement>
        
      </InputGroup>
      <FileUpload 
     
      />
      </Flex>
  );
};

export default ChatInputGroup;
