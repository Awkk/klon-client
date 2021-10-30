import { Box } from "@chakra-ui/react";
import React from "react";
import { CommentFragmentFragment } from "../generated/graphql";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: CommentFragmentFragment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <Box>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </Box>
  );
};
