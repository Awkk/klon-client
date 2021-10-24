import { Flex } from "@chakra-ui/layout";
import { IconButton, useColorModeValue, Text } from "@chakra-ui/react";
import React from "react";
import {
  TiArrowDownOutline,
  TiArrowDownThick,
  TiArrowUpOutline,
  TiArrowUpThick,
} from "react-icons/ti";
import { PostsQuery, useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
  post: PostsQuery["posts"]["posts"][0];
}

enum VoteValue {
  UpVote = 1,
  UnVote = 0,
  DownVote = -1,
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [_, vote] = useVoteMutation();

  const voteGray = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <IconButton
        aria-label="upvote post"
        icon={
          post.voteStatus === VoteValue.UpVote ? (
            <TiArrowUpThick />
          ) : (
            <TiArrowUpOutline />
          )
        }
        size="xs"
        fontSize="2xl"
        variant="ghost"
        color={post.voteStatus === VoteValue.UpVote ? "red.500" : voteGray}
        onClick={() => {
          const value =
            post.voteStatus === VoteValue.UpVote
              ? VoteValue.UnVote
              : VoteValue.UpVote;
          vote({ postId: post.id, value: value });
        }}
      />
      <Text fontSize="sm">{post.score}</Text>
      <IconButton
        aria-label="downvote post"
        icon={
          post.voteStatus === VoteValue.DownVote ? (
            <TiArrowDownThick />
          ) : (
            <TiArrowDownOutline />
          )
        }
        size="xs"
        fontSize="2xl"
        variant="ghost"
        color={post.voteStatus === VoteValue.DownVote ? "blue.500" : voteGray}
        onClick={() => {
          const value =
            post.voteStatus === VoteValue.DownVote
              ? VoteValue.UnVote
              : VoteValue.DownVote;
          vote({ postId: post.id, value: value });
        }}
      />
    </Flex>
  );
};
