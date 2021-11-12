import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  PostSort,
  PostsQueryVariables,
  usePostsQuery,
} from "../generated/graphql";
import { PostItem } from "./PostItem";
import { PostSkeleton } from "./PostSkeleton";

type PostPageProps = {
  variables: PostsQueryVariables;
  isLastPage: boolean;
  sort: PostSort;
  setNextCursor: (cursor: string, idCursor: number) => void;
};

export const PostPage = ({
  variables,
  isLastPage,
  sort,
  setNextCursor,
}: PostPageProps) => {
  const [{ data, fetching }] = usePostsQuery({
    variables,
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!fetching && isLastPage && data?.posts.hasMore) {
      const lastPost = data.posts.posts[data.posts.posts.length - 1];
      setNextCursor("" + lastPost[sort], lastPost.id);
    }
  }, [
    fetching,
    isLastPage,
    data?.posts.hasMore,
    data?.posts.posts,
    sort,
    setNextCursor,
  ]);

  if (fetching) {
    return (
      <Box>
        <PostSkeleton />
        <PostSkeleton />
      </Box>
    );
  }

  if (data?.posts.posts.length === 0) {
    return (
      <Stack align="center" spacing="3" p="4">
        <Text fontSize="lg" fontWeight="semibold">
          No posts were found.
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          Try Changing the filters.
        </Text>
      </Stack>
    );
  }

  return (
    <>
      {data?.posts.posts.map((post) => (
        <PostItem key={post.id} post={post} listMode />
      ))}
    </>
  );
};
