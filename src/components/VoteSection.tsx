import { Flex } from "@chakra-ui/layout";
import { IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  TiArrowDownOutline,
  TiArrowDownThick,
  TiArrowUpOutline,
  TiArrowUpThick,
} from "react-icons/ti";
import { useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
  id: number;
  score: number;
  voteStatus: number;
}

enum VoteValue {
  UpVote = 1,
  UnVote = 0,
  DownVote = -1,
}

export const VoteSection: React.FC<VoteSectionProps> = ({
  id,
  score,
  voteStatus,
}) => {
  const [_, vote] = useVoteMutation();

  const voteGray = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <IconButton
        aria-label="upvote post"
        icon={
          voteStatus === VoteValue.UpVote ? (
            <TiArrowUpThick />
          ) : (
            <TiArrowUpOutline />
          )
        }
        size="xs"
        fontSize="2xl"
        variant="ghost"
        color={voteStatus === VoteValue.UpVote ? "red.500" : voteGray}
        onClick={() => {
          const value =
            voteStatus === VoteValue.UpVote
              ? VoteValue.UnVote
              : VoteValue.UpVote;
          vote({ postId: id, value: value });
        }}
      />
      <Text fontSize="sm">{score}</Text>
      <IconButton
        aria-label="downvote post"
        icon={
          voteStatus === VoteValue.DownVote ? (
            <TiArrowDownThick />
          ) : (
            <TiArrowDownOutline />
          )
        }
        size="xs"
        fontSize="2xl"
        variant="ghost"
        color={voteStatus === VoteValue.DownVote ? "blue.500" : voteGray}
        onClick={() => {
          const value =
            voteStatus === VoteValue.DownVote
              ? VoteValue.UnVote
              : VoteValue.DownVote;
          vote({ postId: id, value: value });
        }}
      />
    </Flex>
  );
};
