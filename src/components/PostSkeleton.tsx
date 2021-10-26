import { Flex, Skeleton, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { VoteSection } from "./VoteSection";

interface PostSkeletonProps {}

export const PostSkeleton: React.FC<PostSkeletonProps> = ({}) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      w="100%"
      px="2"
      pt="2"
      pb="1"
      bgColor={bgColor}
      borderWidth="0.5px"
      borderColor={borderColor}
      _first={{ borderTopRadius: "md" }}
      _last={{ borderBottomRadius: "md" }}
    >
      <VoteSection id={0} score={0} voteStatus={0} locked />
      <Stack flex="1" pl="5">
        <Skeleton h="4" maxW="xs" />
        <Skeleton h="4" maxW="sm" />
        <Skeleton h="4" maxW="xs" />
      </Stack>
    </Flex>
  );
};
