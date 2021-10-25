import { Flex, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { BiComment, BiEditAlt, BiTrash } from "react-icons/bi";

interface PostActionBarProps {
  postId: number;
  authorId: number;
  comments: number;
}

export const PostActionBar: React.FC<PostActionBarProps> = ({
  authorId,
  comments,
}) => {
  const [{ data }] = useMeQuery();
  const textColor = useColorModeValue("gray.500", "gray.400");

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
          <Button leftIcon={<BiEditAlt />} {...buttonStyle}>
            Edit
          </Button>
          <Button leftIcon={<BiTrash />} {...buttonStyle}>
            Delete
          </Button>
        </>
      ) : null}
    </Flex>
  );
};
