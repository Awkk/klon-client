import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Post, User } from "../generated/graphql";
import { PostActionBar } from "./PostActionBar";
import { PostedBy } from "./PostedBy";
import { VoteSection } from "./VoteSection";
import NextLink from "next/link";

type PostItemProps = {
  post: Omit<Post, "text" | "authorId" | "author"> & {
    author: Pick<User, "id" | "username">;
    text?: string;
  };
  clickable?: boolean;
};

export const PostItem = ({ post, clickable }: PostItemProps) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");

  const body = (
    <Flex
      w="100%"
      px="2"
      pt="2"
      pb="1"
      bgColor={bgColor}
      borderWidth="0.5px"
      borderColor={borderColor}
      _first={{ borderTopRadius: "md" }}
      _last={{ borderBottomRadius: "md" }}
      cursor={clickable ? "pointer" : "default"}
      _hover={clickable ? { borderColor: hoverBorderColor } : undefined}
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
  );

  return clickable ? (
    <NextLink href={`/post/${post.id}`}>{body}</NextLink>
  ) : (
    <>{body}</>
  );
};
