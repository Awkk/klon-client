import { Stack } from "@chakra-ui/react";
import React from "react";
import { CommentFragmentFragment } from "../generated/graphql";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: CommentFragmentFragment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <Stack>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};
