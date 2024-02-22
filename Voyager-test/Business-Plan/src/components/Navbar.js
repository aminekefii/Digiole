import React from 'react';
import { Flex, Heading, Spacer, Text, HStack, Button, IconButton } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/color-mode';
import { Avatar } from '@chakra-ui/avatar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex w="100%" p="10px"  top="0" left="0" right="0" zIndex="sticky">
      <Link to="/">
        <Heading ml="8" size="md" fontWeight="semibold" color="cyan.400">
          Voyager
        </Heading>
      </Link>
      <Spacer />
      <HStack spacing="20px">
        <Avatar src="/user.jpg" />
        <Text fontSize="13px" fontWeight="semibold">
          aminekefi416@gmail.com
        </Text>
        <Button colorScheme="blue">Logout</Button>
      </HStack>
      <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} isRound onClick={toggleColorMode} />
    </Flex>
  );
};

export default Navbar;
