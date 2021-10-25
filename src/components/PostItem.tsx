import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Post, User } from "../generated/graphql";
import { PostActionBar } from "./PostActionBar";
import { PostedBy } from "./PostedBy";
import { VoteSection } from "./VoteSection";

type PostItemProps = {
  post: Omit<Post, "text" | "authorId" | "author"> & {
    author: Pick<User, "id" | "username">;
    text?: string;
  };
};

export const PostItem = ({ post }: PostItemProps) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");

  return (
    <NextLink href="/post/[id]" as={`/post/${post.id}`}>
      <Flex
        w="100%"
        px="2"
        pt="2"
        pb="1"
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
          alignItems="flex-start"
        >
          <VoteSection
            id={post.id}
            score={post.score}
            voteStatus={post.voteStatus}
          />
        </Box>
        <Flex direction={"column"} ml={5}>
          <PostedBy author={post.author} createdDate={post.createdDate} />
          <Box my="1">
            <Text fontSize="md" fontWeight="medium">
              {post.title}
            </Text>
          </Box>
          {post.text ? (
            <Box my="4">
              <Text fontSize="md">{post.text}</Text>
            </Box>
          ) : null}
          <PostActionBar
            authorId={post.author.id}
            postId={post.id}
            comments={0}
          />
        </Flex>
      </Flex>
    </NextLink>
  );
};
