import { Flex, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { BiComment, BiEditAlt, BiTrash } from "react-icons/bi";
import { useRouter } from "next/router";

interface PostActionBarProps {
  postId: number;
  authorId: number;
  comments: number;
}

export const PostActionBar: React.FC<PostActionBarProps> = ({
  postId,
  authorId,
  comments,
}) => {
  const [{ data }] = useMeQuery();
  const [_, deletePost] = useDeletePostMutation();
  const router = useRouter();
  const textColor = useColorModeValue("gray.500", "gray.400");

  const buttonStyle = {
    variant: "ghost",
    size: "xs",
    p: "2",
    color: textColor,
  };

  return (
    <Flex
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Button leftIcon={<BiComment />} {...buttonStyle}>
        {comments} Comments
      </Button>
      {authorId === data?.me?.id ? (
        <>
          <Button leftIcon={<BiEditAlt />} {...buttonStyle}>
            Edit
          </Button>
          <Button
            leftIcon={<BiTrash />}
            {...buttonStyle}
            onClick={async () => {
              await deletePost({ id: postId });
              router.replace("/");
            }}
          >
            Delete
          </Button>
        </>
      ) : null}
    </Flex>
  );
};
