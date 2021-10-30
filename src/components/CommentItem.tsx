import { Text, Flex, Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { CommentFragmentFragment } from "../generated/graphql";
import { PostedBy } from "./PostedBy";

interface CommentItemProps {
  comment: CommentFragmentFragment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      w="100%"
      px="4"
      py="2"
      direction="column"
      bgColor={bgColor}
      borderWidth="0.5px"
      borderColor={borderColor}
      _first={{ borderTopRadius: "md" }}
      _last={{ borderBottomRadius: "md" }}
    >
      <PostedBy
        author={comment.author}
        createdDate={comment.createdDate}
        short
      />
      <Box mt="1">
        <Text fontSize="sm">{comment.text}</Text>
      </Box>
    </Flex>
  );
};
