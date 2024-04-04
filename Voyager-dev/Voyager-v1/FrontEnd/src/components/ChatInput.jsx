import React from 'react';
import { InputGroup, InputLeftElement, Input, InputRightElement, Image, Button, Center } from '@chakra-ui/react';

const ChatInputGroup = ({ prompt, setPrompt, handleKeyDown, handleMessageSubmit }) => {
  return (
    <InputGroup w="76%">
      <InputLeftElement>
        <Image src="images/img_component_19.svg" />
      </InputLeftElement>
      <Input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`| Message Voyager...`}
        pr={{ base: "20px", sm: 0 }}
      />
      <InputRightElement>
        <Button onClick={handleMessageSubmit} padding="0" bg="transparent" border="none" outline="none" cursor="pointer">
          <Center w="20px" h="20px">
            <Image src="images/img_save.svg" />
          </Center>
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default ChatInputGroup;
