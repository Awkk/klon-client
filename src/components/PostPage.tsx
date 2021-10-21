import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { PostsQueryVariables, usePostsQuery } from "../generated/graphql";

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
            <Box flex={1}>
              <Flex>
                <Box mr={"auto"}>{post.id}</Box>
                <Box>{post.createdDate}</Box>
              </Flex>
              <Heading fontSize="xl">{post.title}</Heading>
            </Box>
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
