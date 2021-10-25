import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner, useColorModeValue } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { PostedBy } from "../../components/PostedBy";
import { VoteSection } from "../../components/VoteSection";
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
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const post = data?.post;

  if (fetching) {
    return <Spinner />;
  }
  if (!post) {
    return <Box>Error</Box>;
  }
  return (
    <Flex
      w="100%"
      maxW="8xl"
      p="2"
      bgColor={bgColor}
      borderWidth="0.5px"
      borderColor={borderColor}
      borderRadius="md"
    >
      <Box alignItems="flex-start">
        <VoteSection post={post} />
      </Box>
      <Flex direction="column" ml="5">
        <PostedBy author={post.author} createdDate={post.createdDate} />
        <Text fontSize="lg" fontWeight="medium">
          {post.title}
        </Text>
        <Box mt="5">
          <Text fontSize="md">{post.text}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default withUrqlClient(urqlClientConfig)(Post);
