import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PostsQueryVariables, usePostsQuery } from "../generated/graphql";
import { VoteSection } from "./VoteSection";
import NextLink from "next/link";

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
  console.log(data?.posts);
  
  return (
    <>
      <Box>
        {data?.posts.posts.map((post) => (
          <NextLink key={post.id} href="/post/[id]" as={`/post/${post.id}`}>
            <Flex p={5} borderWidth="1px">
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <VoteSection post={post} />
              </Box>
              <Flex direction={"column"} ml={5}>
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mr={2}>
                  Posted by {post.author.username} {post.createdDate}
                </Text>
              </Flex>
            </Flex>
          </NextLink>
        ))}
      </Box>
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
