import { Box } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { PostItem } from "../../components/PostItem";
import { urqlClientConfig } from "../../config/urqlClientConfig";
import { usePostQuery } from "../../generated/graphql";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    variables: { postId: postId },
    pause: postId === -1,
  });

  const post = data?.post;

  if (fetching) {
    return <Spinner />;
  }
  if (!post) {
    return <Box>Error</Box>;
  }
  return (
    <Box w="100%" maxW="8xl">
      <PostItem post={post} />
    </Box>
  );
};

export default withUrqlClient(urqlClientConfig)(Post);
