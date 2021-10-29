import {
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiComment, BiEditAlt, BiTrash } from "react-icons/bi";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { Dialog } from "./Dialog";

interface PostActionBarProps {
  postId: number;
  authorId: number;
  comments: number;
  setIsEditing: (flag: boolean) => void;
}

export const PostActionBar: React.FC<PostActionBarProps> = ({
  postId,
  authorId,
  comments,
  setIsEditing,
}) => {
  const [{ data }] = useMeQuery();
  const [_, deletePost] = useDeletePostMutation();
  const router = useRouter();
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
      <Button leftIcon={<BiComment />} {...buttonStyle}>
        {comments} Comments
      </Button>
      {authorId === data?.me?.id ? (
        <>
          <Button
            leftIcon={<BiEditAlt />}
            onClick={(e) => {
              e.stopPropagation();
              const postPath = `/post/${postId}`;
              if (!router.asPath.startsWith(postPath)) {
                router.push(`${postPath}?editing=true`);
              } else {
                setIsEditing(true);
              }
            }}
            {...buttonStyle}
          >
            Edit
          </Button>
          <Button
            leftIcon={<BiTrash />}
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            {...buttonStyle}
          >
            Delete
          </Button>
          <Dialog
            header="Delete post?"
            body="Are you sure you want to delete your post?"
            confirmText="Delete post"
            isOpen={isOpen}
            onClose={onClose}
            onClick={async () => {
              await deletePost({ id: postId });
              router.replace("/");
            }}
          />
        </>
      ) : null}
    </Flex>
  );
};
