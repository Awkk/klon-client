import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { PostFragmentFragment } from "../generated/graphql";

interface PostContentProps {
  post: PostFragmentFragment & {
    text?: string;
  };
  listMode?: boolean;
}

export const PostContent: React.FC<PostContentProps> = ({ post, listMode }) => {
  return (
    <>
      <Box my="1">
        <Text fontSize={listMode ? "md" : "lg"} fontWeight="medium">
          {post.title}
        </Text>
      </Box>
      {post.text ? (
        <Box my="4">
          <Text fontSize="md">{post.text}</Text>
        </Box>
      ) : null}
    </>
  );
};
