import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Flex, Image, Text, Button } from '@chakra-ui/react';

const Navbar = ({ signInWith }) => {
  return (
    <Container maxW="1268px" w="100%" px="0px" mx="auto" p={{ md: '', base: '20px' }}>
      <Flex justifyContent="space-between" alignItems="center" gap="20px" flexDirection={{ md: 'row', base: 'column' }}>
        <Flex gap="12px" w={{ md: '10%', base: '100%' }} justifyContent="left" alignItems="center">
          <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
          <Image src="images/img_voyager.svg" h="12px" />
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" gap="50px">
          <Text
            color="gray.50"
            letterSpacing="-0.08px"
            textAlign="center"
            fontWeight={500}
            fontSize={{ base: 'sm', sm: 'md' }}
            _hover={{ textDecoration: 'underline', color: 'white' }}
          >
            FAQ
          </Text>
          <Text
            color="gray.50"
            letterSpacing="-0.08px"
            textAlign="center"
            fontWeight={500}
            fontSize={{ base: 'sm', sm: 'md' }}
            _hover={{ textDecoration: 'underline', color: 'white' }}
            ml="20px"
          >
            Contact
          </Text>
          <Button
            as={Link}
            to="/login"
            size="sm"
            variant="outline"
            colorScheme="lime_100"
            color="white.A700_01"
            letterSpacing="-0.08px"
            fontWeight={500}
            minW={{ base: '50px', md: '70px' }}
            borderRadius="20px"
            _hover={{ bg: '#EAF2BB', color: 'black' }}
            fontSize={{ base: 'xs', md: 'sm' }}
            ml="20px"
          >
            {signInWith}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
