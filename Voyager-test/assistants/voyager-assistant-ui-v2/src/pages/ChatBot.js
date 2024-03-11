import { useRef, useState } from "react";
import marked from "marked"; // renamed import
import htmlParse from "html-react-parser"; // renamed import
import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";

export default function Home() {
  const messageRef = useRef();

  const [messages, setMessages] = useState([]);
  const [displayMessage, setDisplayMessage] = useState("Hi there!");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = messageRef.current.value;

    setLoading(true);

    let newMessageList = [
      ...messages,
      {
        role: "user",
        content: prompt,
      },
    ];

    try {
      const response = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessageList }),
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      newMessageList.push({
        role: data.response.message.role,
        content: data.response.message.content,
      });

      setMessages(newMessageList);
      setDisplayMessage(data.response.message.content);
      messageRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="4xl">
      <Flex gridGap="4">
        <Box
          bg="blue.400"
          py="4"
          px="4"
          flex="1"
          position="relative"
          justifyContent="center"
          alignItems="center"
          className={loading ? "animate-pulse" : ""}
        >
          <Box
            bg="blue.400"
            h="15px"
            w="15px"
            position="absolute"
            right="-7px"
            top="50%"
            transform="rotate(45deg)"
          />
          <Text fontSize="2xl" color="white" fontWeight="bold">Botty Says:</Text>
          <Text color="white">
            {loading ? "[Botty is thinking]" : htmlParse(marked(displayMessage))}
          </Text>
        </Box>

        <Box>
          <img alt="Botty" src="/bot.png" width={512} height={512} />
        </Box>
      </Flex>

      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" gridGap="4" mt="6">
          <label className="font-bold">Say something..</label>
          <Input
            px="4"
            py="2"
            color="gray.700"
            placeholder="Ask a question or say something nice."
            ref={messageRef}
            required
          />
        </Flex>

        <Button
          type="submit"
          px="4"
          py="2"
          mt="2"
          color="gray.700"
          bg="gray.100"
          border="1px"
          borderColor="gray.700"
          borderRadius="lg"
          _hover={{ transform: "scale(1.1)" }}
        >
          Send 🚀
        </Button>
      </form>

      <Box mt="6">
        {messages.map((message, index) => (
          <Flex key={index} alignItems="center" gridGap="4" py="2">
            <Box w="10%" display="flex" alignItems="center">
              {message.role === "assistant" ? (
                <Box w="50px" h="50px" rounded="full" overflow="hidden">
                  <img src="/bot.png" alt="Bot" className="w-full h-full object-cover" />
                </Box>
              ) : (
                <Text fontSize="xl" fontWeight="bold">You:</Text>
              )}
            </Box>

            <Box bg="gray.100" py="2" px="4" border="1px" borderColor="gray.400" borderRadius="xl">
              {message.content}
            </Box>
          </Flex>
        ))}
      </Box>
    </Container>
  );
}
