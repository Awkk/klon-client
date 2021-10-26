import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { BiComment, BiEditAlt, BiTrash } from "react-icons/bi";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

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
          <Button leftIcon={<BiTrash />} onClick={onOpen} {...buttonStyle}>
            Delete
          </Button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Delete post?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure you want to delete your post?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={async () => {
                    await deletePost({ id: postId });
                    router.replace("/");
                  }}
                >
                  Delete post
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : null}
    </Flex>
  );
};
