import {
  Box,
  Flex,
  Link,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { format } from "timeago.js";
import { PostsQuery } from "../generated/graphql";
import { VoteSection } from "./VoteSection";

type PostItemProps = {
  post: PostsQuery["posts"]["posts"][0];
};

export const PostItem = ({ post }: PostItemProps) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");
  const infoTextColor = useColorModeValue("gray.500", "gray.400");

  return (
    <NextLink href="/post/[id]" as={`/post/${post.id}`}>
      <Flex
        p="2"
        bgColor={bgColor}
        borderWidth="0.5px"
        borderColor={borderColor}
        cursor="pointer"
        _hover={{ borderColor: hoverBorderColor }}
        _first={{ borderTopRadius: "xl" }}
        _last={{ borderBottomRadius: "xl" }}
      >
        <Box
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <VoteSection post={post} />
        </Box>
        <Flex direction={"column"} ml={5}>
          <Flex fontSize="xs" color={infoTextColor} whiteSpace="pre-wrap">
            <Text>Posted by </Text>
            <NextLink href="/u/[id]" as={`/u/${post.author.id}`}>
              <Link>{post.author.username}</Link>
            </NextLink>
            <Text> </Text>
            <Tooltip label={new Date(post.createdDate).toLocaleString()}>
              <Box _hover={{ textDecoration: "underline" }}>
                {format(post.createdDate)}
              </Box>
            </Tooltip>
          </Flex>
          <Text fontSize="md" fontWeight="medium">
            {post.title}
          </Text>
        </Flex>
      </Flex>
    </NextLink>
  );
};
