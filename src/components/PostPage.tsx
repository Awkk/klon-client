import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
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

  return (
    <>
      <Box>
        {data?.posts.posts.map((post) => (
          <Flex key={post.id} p={5} borderWidth="1px">
            <VoteSection post={post} />
            <Flex direction={"column"} ml={5}>
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mr={2}>
                Posted by {post.author.username} {post.createdDate}
              </Text>
            </Flex>
          </Flex>
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
