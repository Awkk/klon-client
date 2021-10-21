import { IconButton } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import React from "react";
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

  return (
    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <IconButton
        aria-label="upvote post"
        icon={<TriangleUpIcon />}
        onClick={() => {
          const value =
            post.voteStatus === VoteValue.UpVote
              ? VoteValue.UnVote
              : VoteValue.UpVote;
          vote({ postId: post.id, value: value });
        }}
        colorScheme={post.voteStatus === VoteValue.UpVote ? "green" : undefined}
      />
      {post.score}
      <IconButton
        aria-label="downvote post"
        icon={<TriangleDownIcon />}
        onClick={() => {
          const value =
            post.voteStatus === VoteValue.DownVote
              ? VoteValue.UnVote
              : VoteValue.DownVote;
          vote({ postId: post.id, value: value });
        }}
        colorScheme={post.voteStatus === VoteValue.DownVote ? "red" : undefined}
      />
    </Flex>
  );
};
