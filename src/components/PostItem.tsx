import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { PostsQuery } from "../generated/graphql";
import { PostedBy } from "./PostedBy";
import { VoteSection } from "./VoteSection";

type PostItemProps = {
  post: PostsQuery["posts"]["posts"][0];
};

export const PostItem = ({ post }: PostItemProps) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");

  return (
    <NextLink href="/post/[id]" as={`/post/${post.id}`}>
      <Flex
        p="2"
        bgColor={bgColor}
        borderWidth="0.5px"
        borderColor={borderColor}
        cursor="pointer"
        _hover={{ borderColor: hoverBorderColor }}
        _first={{ borderTopRadius: "md" }}
        _last={{ borderBottomRadius: "md" }}
      >
        <Box
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <VoteSection post={post} />
        </Box>
        <Flex direction={"column"} ml={5}>
          <PostedBy author={post.author} createdDate={post.createdDate} />
          <Text fontSize="md" fontWeight="medium">
            {post.title}
          </Text>
        </Flex>
      </Flex>
    </NextLink>
  );
};
