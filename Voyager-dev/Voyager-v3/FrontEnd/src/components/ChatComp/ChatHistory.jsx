import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Button, Image, Text } from '@chakra-ui/react';
import axios from 'axios';

const ChatHistory = () => {
  const handleDownload = async () => {
    const filename = "businessplan.txt"; // Assuming the file name is "businessplan.csv"
    try {
      const response = await axios.get(`http://localhost:3000/downloads/${filename}`, { responseType: "blob" });
      const url = URL.createObjectURL(response.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    // Check if the file exists and initiate download
    handleDownload();
  }, []);

  return (
    <Flex mt="16px" gap="18px" w={{ md: "24%", base: "100%" }} flexDirection="column" alignItems="start">
      <Box
        ml={{ md: "4px", base: "0px" }}
        pb={{ base: "20px", sm: "21px" }}
        pr={{ base: "20px", sm: "21px" }}
        borderColor="blue_gray.400_5b"
        borderBottomWidth="1px"
        borderStyle="solid"
        alignSelf="stretch"
      >
        <Button
          as={Link}
          to="/assistants"
          size="2xl"
          variant="outline"
          colorScheme="indigo_900"
          rightIcon={<Image src="images/img_news.svg" />}
          gap="35px"
          w="100%"
          borderRadius="8px"
          px={{ base: "20px", sm: "" }}
        >
          Explore other assistants
        </Button>
      </Box>
      <Box>
        <Button
          as={Link}
          to=""
          size="2xl"
          variant="outline"
          colorScheme="indigo_900"
          h="30px"
          gap="35px"
          w="150px"
          borderRadius="8px"
          px={{ base: "20px", sm: "" }}
          onClick={() => window.location.reload()}
        >
          New chat
        </Button>
      </Box>
      
    </Flex>
  );
};

export default ChatHistory;
