import { Container, Heading, Text, Box } from "@chakra-ui/react";

export default function Dashboard() {

  const boxStyles = {
    p: "10px",
    bg: "purple.400",
    color: "white",
    m: "10px",
    textAlign: 'center',
    ':hover': {
      color: 'black',
      bg:'blue.100'

    },
    filter: 'blur(1px)'
    }

  return (
    <Container as="section" maxW="8xl" py="20px">
      <Heading my="30px" p="10px">Chakra UI Components</Heading>
      <Text ml="30px">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, cum.</Text>
      <Text ml="30px" color="blue.300" fontWeight="bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, cum.</Text>
      <Box my="30px" p="20px" bg="orange">
        <Text color="white">This is BOX</Text>
      </Box>
      <Box sx={boxStyles}>Hello, Ninjas!</Box>
    </Container>
  )
}
