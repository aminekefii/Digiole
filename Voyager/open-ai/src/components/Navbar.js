import React from 'react';
import { Flex, Heading, Spacer, HStack, IconButton } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/color-mode';
import { Link } from 'react-router-dom';

const Navbar = () => {
 

  return (
    <Flex w="100%" p="10px" top="0" left="0" right="0" zIndex="sticky">
      <Link to="/">
        <Heading ml="8" size="md" fontWeight="semibold" color="cyan.400">
          DIAS
        </Heading>
      </Link>
      <Spacer />
      <HStack spacing="20px">
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginRight: '10px' }}>
            <Link to="/chatbot">Some Page</Link>
          </li>
          <li style={{ marginRight: '10px' }}>
            <Link to="/another-page">Another Page</Link>
          </li>
       
        </ul>
      </HStack>
    </Flex>
  );
};

export default Navbar;
