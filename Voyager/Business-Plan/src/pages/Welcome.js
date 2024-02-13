import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image';
import { Stack, Circle, Flex, Box, Text, Heading } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import React from 'react'
import { Link } from 'react-router-dom';


function Welcome() {

    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";

    const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

    return (
        <Stack>
            <Circle position="absolute" bg="blue.100" opacity="0.1" w="300px" h="300px" alignSelf="flex-end" />

            <Flex direction={isNotSmallerScreen ? "row" : "column"} spacing={isNotSmallerScreen ? "200px" : "0"} p={isNotSmallerScreen ? "32" : "0"} alignSelf="flex-start">
                <Box mt={isNotSmallerScreen ? "0" : 16} align='flex-start'>
                    <Text fontSize="5xl" fontWeight="semibold">Hi, Amine</Text>
                    <Text fontSize="7xl" fontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500, purple.600)" bgClip='text'>Welcome To Voyager</Text>
                    <Text color={isDark ? "gray.200" : "gray.500"}></Text>
                    <Button mt={8} colorScheme="blue" as="a" href="#start">Get Started</Button>
                </Box>

                <Image alignSelf="center" mt={isNotSmallerScreen ? "0" : "12"} mb={isNotSmallerScreen ? "0" : "12"} borderRadius='full' backgroundColor="transparent" boxShadow="lg" boxSize="300px" src="/user.jpg" />
            </Flex>

            <Flex direction={isNotSmallerScreen ? "row" : "column"} w="100%" id="start" px={{ base: "8", md: "32" }} py={{ base: "8", md: "16" }}>
                <Box alignSelf="center" mb={{ base: "8", md: "0" }}>
                    <Text fontSize="2xl" color="gray.400"></Text>
                </Box>
                <Box alignSelf="center" mb={{ base: "8", md: "0" }}>
                    <Text fontWeight="bold" fontSize="2xl">Where would you like to start?</Text>
                    <Flex direction={isNotSmallerScreen ? "row" : "column"} mt={8} >

                        <Flex
                            as={Link}
                            to="/Buisinessch"
                            rounded="xl"
                            direction="column"
                            mt={4}
                            bg="blue.400"
                            w={{ base: '80%', md: '30vh' }}
                            align="center"
                            _hover={{ bg: 'teal.400' }}
                        >

                            <Image src="/buiplan.png" w={{ base: "80px", md: "150px" }} height={{ base: "80px", md: "150px" }} mt={{ base: "20px", md: "0" }} mb={{ base: "4", md: "0" }} />
                            <Text color="white" p="4" fontSize={{ base: "md", md: "xl" }} fontWeight="semibold">
                                Business Plan
                            </Text>
                        </Flex>



                        <Flex
                         as={Link}
                         to="/chatContainer"
                        rounded="xl" direction="column" mt={isNotSmallerScreen ? 4 : 0} ml={isNotSmallerScreen ? 4 : 0} bg="gray.100" h="30vh" w="30vh" justify="flex-end" _hover={{ bg: "teal.400", }}>
                            <Text color="black" p="4" fontSize="xl" fontWeight="semibold">
                                Other Plans
                            </Text>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Stack>



    )
}

export default Welcome;
