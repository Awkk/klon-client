import {
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useDeleteCommentMutation, useMeQuery } from "../generated/graphql";
import { Dialog } from "./Dialog";

interface CommentActionBarProps {
  commentId: number;
  authorId: number;
  setIsEditing: (flag: boolean) => void;
}

export const CommentActionBar: React.FC<CommentActionBarProps> = ({
  commentId,
  authorId,
  setIsEditing,
}) => {
  const [{ data }] = useMeQuery();
  const [_, deleteComment] = useDeleteCommentMutation();
  const textColor = useColorModeValue("gray.500", "gray.400");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonStyle = {
    variant: "ghost",
    size: "xs",
    p: "2",
    color: textColor,
  };

  return (
    <Flex>
      {authorId === data?.me?.id ? (
        <>
          <Button
            leftIcon={<BiEditAlt />}
            onClick={() => {
              setIsEditing(true);
            }}
            {...buttonStyle}
          >
            Edit
          </Button>
          <Button
            leftIcon={<BiTrash />}
            onClick={() => {
              onOpen();
            }}
            {...buttonStyle}
          >
            Delete
          </Button>
          <Dialog
            header="Delete comment?"
            body="Are you sure you want to delete your comment?"
            confirmText="Delete comment"
            isOpen={isOpen}
            onClose={onClose}
            onClick={async () => {
              await deleteComment({ id: commentId });
              onClose();
            }}
          />
        </>
      ) : null}
    </Flex>
  );
};
