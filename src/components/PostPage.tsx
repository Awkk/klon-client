import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { PostsQueryVariables, usePostsQuery } from "../generated/graphql";
import { VoteSection } from "./VoteSection";

type PostPageProps = {
  variables: PostsQueryVariables;
  isLastPage: boolean;
  onLoadMore: (cursor: string) => void;
};

export const PostPage = ({
  variables,
  isLastPage,
  onLoadMore,
}: PostPageProps) => {
  const [{ data, fetching }] = usePostsQuery({ variables });
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");
  const infoTextColor = useColorModeValue("gray.500", "gray.400");

  return (
    <>
      {data?.posts.posts.map((post) => (
        <NextLink key={post.id} href="/post/[id]" as={`/post/${post.id}`}>
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
              <Text fontSize="md" fontWeight="medium">
                {post.title}
              </Text>
              <Text fontSize="xs" color={infoTextColor}>
                Posted by {post.author.username} {post.createdDate}
              </Text>
            </Flex>
          </Flex>
        </NextLink>
      ))}

      {(isLastPage && fetching) || (isLastPage && data?.posts.hasMore) ? (
        <Flex>
          <Button
            onClick={() => {
              if (data?.posts) {
                onLoadMore(
                  data.posts.posts[data.posts.posts.length - 1].createdDate
                );
              }
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </>
  );
};
