import React from "react";
import { Flex, Heading, Box, Text, Button, Spacer, HStack, VStack, GridItem, IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";





const Sidebar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "light";

    return (
        <GridItem
            as="aside"
            colSpan={{ base: 6, lg: 2, xl: 1 }}
            bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
            minHeight="100vh" // Adjusted minHeight
            p={{ base: "20px", lg: "30px" }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <VStack spacing="4" align="start">
                <Heading as="h1" fontSize="1.5em" ml="8" size="md" fontWeight='semibold' color="cyan.100">Voyager</Heading>
                <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} isRound='true' onClick={toggleColorMode}></IconButton>
            </VStack>


            <HStack spacing="4" align="center">
                <Box bg="gray.200" p="10px 15px" borderRadius="50%">
                    M
                </Box>
                <Text fontSize="10px" fontWeight="semibold">aminekefi416@gmail.com</Text>
            </HStack>
        </GridItem>
    );
};

export default Sidebar;
