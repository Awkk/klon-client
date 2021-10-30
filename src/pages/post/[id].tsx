import { Box, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { CommentList } from "../../components/CommentList";
import { CreateCommentWidget } from "../../components/CreateCommentWidget";
import { PostItem } from "../../components/PostItem";
import { PostSkeleton } from "../../components/PostSkeleton";
import { urqlClientConfig } from "../../config/urqlClientConfig";
import { useMeQuery, usePostQuery } from "../../generated/graphql";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const [{ data: meData }] = useMeQuery();
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    variables: { postId: postId },
    pause: postId === -1,
  });

  const post = data?.post;

  if (fetching) {
    return <PostSkeleton />;
  }
  if (!post) {
    return <Box>Error</Box>;
  }
  return (
    <Flex w="100%" maxW="8xl" direction="column">
      <PostItem
        post={post}
        styleProps={
          meData?.me ? { borderBottomWidth: "0" } : { borderBottomRadius: "md" }
        }
      />
      {meData?.me ? <CreateCommentWidget postId={post.id} /> : null}
      <Box mt="3">
        <CommentList comments={post.comments} />
      </Box>
    </Flex>
  );
};

export default withUrqlClient(urqlClientConfig)(Post);
