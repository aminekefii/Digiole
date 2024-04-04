import { Flex, Heading, Box, Text, Spacer, HStack } from "@chakra-ui/react"

export default function Navbar() {
  return (
    <Flex as="nav" p="20px" mb="60px" alignItems="center">
      <Heading as="h1" fontSize="1.5em">Voyager</Heading>
      <Spacer />

      <HStack spacing="20px"> 
        <Box bg="gray.200" p="10px 15px" borderRadius="50%">M</Box>
        <Text>aminekefi416@gmail.com</Text>
        <Button colorScheme="blue">Logout</Button>
      </HStack>
    </Flex>
  )
}
