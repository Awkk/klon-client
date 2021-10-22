import { Box, Heading, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { urqlClientConfig } from "../../config/urqlClientConfig";
import { usePostQuery } from "../../generated/graphql";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data }] = usePostQuery({
    variables: { postId: postId },
    pause: postId === -1,
  });

  return (
    <Box p={3}>
      <Heading>{data?.post?.title}</Heading>
      <Text>{data?.post?.text}</Text>
      <Text>{data?.post?.views}</Text>
    </Box>
  );
};

export default withUrqlClient(urqlClientConfig)(Post);
