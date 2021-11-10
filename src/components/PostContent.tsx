import { Box, Text, Link } from "@chakra-ui/react";
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
      <Box mt="1">
        <Text fontSize={listMode ? "md" : "lg"} fontWeight="medium">
          {post.title}
        </Text>
      </Box>
      {post.link ? (
        <Box
          mb="1"
          width="fit-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Text noOfLines={1}>
            <Link fontSize="xs" color="teal.200" href={post.link} isExternal>
              {post.link}
            </Link>
          </Text>
        </Box>
      ) : null}
      {post.text ? (
        <Box my="1">
          <Text fontSize="md">{post.text}</Text>
        </Box>
      ) : null}
    </>
  );
};
