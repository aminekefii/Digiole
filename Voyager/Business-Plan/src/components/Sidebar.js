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
            py="20px"
            mt="10px"
            minHeight="90vh" // Adjusted minHeight
            p={{ base: "20px", lg: "30px" }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <VStack spacing="4" align="start">
                <Heading as="h2" fontSize="1em"  size="md" fontWeight='semibold' >chat History</Heading>
            </VStack>


            <HStack spacing="4" align="center">
                <Box bg="gray.200" p="10px 15px" borderRadius="50%">
                    M
                </Box>
                <Text fontSize="10px" fontWeight="semibold">aminekefi</Text>
            </HStack>
        </GridItem>
    );
};

export default Sidebar;
