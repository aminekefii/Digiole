import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Button, Image } from '@chakra-ui/react';
import axios from 'axios';

const ChatHistory = () => {
  const [fileReady, setFileReady] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const filename = "buissnessplan.txt"; // Ensure the filename and extension are correct

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/downloads/${filename}`, { responseType: "blob" });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setDownloadCompleted(true);  // Set the download as completed
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const checkFileReady = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/file-ready/${filename}`);
      if (response.data.ready) {
        setFileReady(true);
      } else {
        console.log('File not ready:', response.data.error);
        setFileReady(false);
      }
    } catch (error) {
      console.error('Error checking file readiness:', error);
      setFileReady(false);
    }
  };

  useEffect(() => {
    if (!downloadCompleted) {  // Only set up the interval if the download hasn't been completed
      const interval = setInterval(checkFileReady, 5000); // Check every 5 seconds
      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [downloadCompleted]); // React to changes in downloadCompleted

  useEffect(() => {
    if (fileReady && !downloadCompleted) { // Check if the file is ready and not yet downloaded
      handleDownload();
      setFileReady(false); // Reset the fileReady after initiating the download
    }
  }, [fileReady, downloadCompleted]);

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
