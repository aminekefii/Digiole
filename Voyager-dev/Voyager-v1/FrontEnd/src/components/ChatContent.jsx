import React from 'react';
import { Flex, Image, Heading, Text } from '@chakra-ui/react';

const ChatContent = ({ username, message }) => {
  return (
    <Flex
    ml={{ md: "34px", base: "0px" }}
    alignSelf="stretch"
    justifyContent="space-between"
    alignItems="start"
    gap="20px"
    flexDirection={{ md: "row", base: "column" }}
  >
    <Flex mt="12px" gap="23px" w={{ md: "71%", base: "100%" }} flexDirection="column">
      <Flex gap="4px" alignItems="center">
        <Image src="images/img_settings_black_900.svg" h="16px" alignSelf="end" w="16px" />
        <Heading as="h1">Voyager</Heading>
      </Flex>
      <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%">
        Hi Amine! I&#39;m excited to help you create your business plan. Let&#39;s start with understanding
        your area of expertise. Can you tell me about your strengths and what you&#39;re passionate about in
        your business?
      </Text>
      <Flex gap="8px" w={{ md: "14%", base: "100%" }} alignItems="center" flexWrap="wrap">
        <Image src="images/img_avatar_16x16.png" borderRadius="50%" h="16px" w="16px" />
        <Heading>User</Heading>
      </Flex>
      <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%">
        Absolutely! I&#39;m passionate about sustainable living and have a strong background in
        environmental science. My strength lies in developing eco-friendly products that help reduce waste.
      </Text>
      <Flex gap="4px" alignItems="center">
        <Image src="images/img_settings_black_900.svg" h="16px" alignSelf="end" w="16px" />
        <Heading as="h3">Voyager</Heading>
      </Flex>
      <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%">
        That&#39;s fantastic! Would it be okay to include this as part of your expertise in the business
        plan?
      </Text>
      <Flex gap="8px" w={{ md: "14%", base: "100%" }} alignItems="center" flexWrap="wrap">
        <Image src="images/img_avatar_16x16.png" borderRadius="50%" h="16px" w="16px" />
        <Heading as="h4">User</Heading>
      </Flex>
     
    </Flex>

  </Flex>
  );
};

export default ChatContent;
