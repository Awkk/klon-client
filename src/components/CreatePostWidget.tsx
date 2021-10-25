import { Flex, Textarea, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface CreatePostWidgetProps {}

export const CreatePostWidget: React.FC<CreatePostWidgetProps> = ({}) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");
  const textareaBgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <NextLink href="/post/create">
      <Flex
        p="3"
        bgColor={bgColor}
        borderWidth="0.5px"
        borderColor={borderColor}
        borderRadius="md"
      >
        <Textarea
          minH="unset"
          h="12"
          placeholder="Create Post"
          fontSize="sm"
          color="gray.400"
          resize="none"
          bgColor={textareaBgColor}
          _hover={{ borderColor: hoverBorderColor }}
        />
      </Flex>
    </NextLink>
  );
};
