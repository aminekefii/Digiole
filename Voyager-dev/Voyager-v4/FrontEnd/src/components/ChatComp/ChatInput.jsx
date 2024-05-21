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
       <VoiceRec handleNoteChange={handlePromptChange} />
    <InputGroup
       
      >
         
        <InputLeftElement width="10px">
        
        </InputLeftElement>
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`| Message Voyager...`}
          pr={{ base: "0px", sm: "5px" }}
          h="50px"
          pt="5px"
          ml="5px"
          fontSize="15px"
          maxWidth="calc(700px - 80px)"
          width="700px"
          
        />
        <InputRightElement>  
        </InputRightElement>
      </InputGroup>
      <Button
            onClick={handleMessageSubmit}
            padding="0"
            bg="transparent"
            border="none"
            outline="none"
            cursor="pointer"
            pl="10px"
          >
            <Center w="20px" h="20px">
              <Image src="images/img_save.svg" />
            </Center>
          </Button>
      <FileUpload 
     
      />
      </Flex>
  );
};

export default ChatInputGroup;
