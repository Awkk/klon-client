import { Skeleton, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PostsQueryVariables, usePostsQuery } from "../generated/graphql";
import { PostItem } from "./PostItem";

type PostPageProps = {
  variables: PostsQueryVariables;
  isLastPage: boolean;
  setNextCursor: (cursor: string) => void;
};

export const PostPage = ({
  variables,
  isLastPage,
  setNextCursor,
}: PostPageProps) => {
  const [{ data, fetching }] = usePostsQuery({ variables });

  useEffect(() => {
    if (!fetching && isLastPage && data?.posts.hasMore) {
      setNextCursor(data.posts.posts[data.posts.posts.length - 1].createdDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching, isLastPage, data?.posts.hasMore, data?.posts.posts]);

  return (
    <>
      {fetching ? (
        <Stack>
          <Skeleton h="16" />
          <Skeleton h="16" />
          <Skeleton h="16" />
        </Stack>
      ) : (
        data?.posts.posts.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </>
  );
};
