import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
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

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const post = data?.post;

  if (fetching) {
    return <PostSkeleton />;
  }
  if (!post) {
    return <Box>Post not found.</Box>;
  }
  return (
    <>
      <Head>
        <title>{post.title} - Klon</title>
      </Head>
      <Flex w="100%" maxW="siteMaxWidth" direction="column">
        <PostItem
          post={post}
          styleProps={
            meData?.me
              ? { borderBottomWidth: "0" }
              : { borderBottomRadius: "md" }
          }
        />
        {meData?.me ? (
          <Flex
            w="100%"
            px={["2", "4"]}
            py="3"
            bgColor={bgColor}
            borderWidth="0.5px"
            borderTopWidth="0"
            borderColor={borderColor}
            borderBottomRadius="md"
          >
            <CreateCommentWidget postId={post.id} />
          </Flex>
        ) : null}
        <Box mt="1">
          <CommentList comments={post.comments} />
        </Box>
      </Flex>
    </>
  );
};

export default withUrqlClient(urqlClientConfig)(Post);
