import { Text, Flex, Box, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { CommentFragmentFragment } from "../generated/graphql";
import { CommentActionBar } from "./CommentActionBar";
import { CommentUpdateForm } from "./CommentUpdateForm";
import { PostedBy } from "./PostedBy";

interface CommentItemProps {
  comment: CommentFragmentFragment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
      borderRadius="md"
    >
      <PostedBy
        author={comment.author}
        createdDate={comment.createdDate}
        short
      />
      {isEditing ? (
        <CommentUpdateForm
          id={comment.id}
          text={comment.text}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Box my="1">
          <Text fontSize="sm">{comment.text}</Text>
        </Box>
      )}
      <CommentActionBar
        authorId={comment.author.id}
        commentId={comment.id}
        setIsEditing={setIsEditing}
      />
    </Flex>
  );
};
