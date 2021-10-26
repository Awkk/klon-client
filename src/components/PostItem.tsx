import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Post, User, useUpdatePostMutation } from "../generated/graphql";
import { createPostValidation } from "../utils/validationSchemas";
import { InputField } from "./InputField";
import { PostActionBar } from "./PostActionBar";
import { PostedBy } from "./PostedBy";
import { VoteSection } from "./VoteSection";

type PostItemProps = {
  post: Omit<Post, "text" | "authorId" | "author"> & {
    author: Pick<User, "id" | "username">;
    text?: string;
  };
  clickable?: boolean;
};

interface UpdatePostFormData {
  title: string;
  text: string;
}

export const PostItem = ({ post, clickable }: PostItemProps) => {
  const router = useRouter();
  const editParam = router.query.editing === "true";
  const [isEditing, setIsEditing] = useState<boolean>(editParam);
  const [, updatePost] = useUpdatePostMutation();

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");

  const displayContent = (
    <>
      <Box my="1">
        <Text fontSize={clickable ? "md" : "lg"} fontWeight="medium">
          {post.title}
        </Text>
      </Box>
      {post.text ? (
        <Box my="4">
          <Text fontSize="md">{post.text}</Text>
        </Box>
      ) : null}
    </>
  );

  const initialValues: UpdatePostFormData = {
    title: post.title,
    text: post.text ? post.text : "",
  };

  const editContent = (
    <Box my="3">
      <Formik
        initialValues={initialValues}
        validationSchema={createPostValidation}
        onSubmit={async (values) => {
          const result = await updatePost({
            id: post.id,
            input: { title: values.title, text: values.text },
          });
          if (!result.error) {
            setIsEditing(false);
          }
        }}
        validateOnBlur={false}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing="4">
              <InputField name="title" placeholder="Title" />
              <InputField name="text" placeholder="Text" textarea />
              <Flex justifyContent="flex-end">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  variant="solid"
                  colorScheme="teal"
                  size="sm"
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );

  const body = (
    <Flex
      w="100%"
      px="2"
      pt="2"
      pb="1"
      bgColor={bgColor}
      borderWidth="0.5px"
      borderColor={borderColor}
      _first={{ borderTopRadius: "md" }}
      _last={{ borderBottomRadius: "md" }}
      cursor={clickable ? "pointer" : "default"}
      _hover={clickable ? { borderColor: hoverBorderColor } : undefined}
    >
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
        alignItems="flex-start"
      >
        <VoteSection
          id={post.id}
          score={post.score}
          voteStatus={post.voteStatus}
        />
      </Box>
      <Flex direction={"column"} ml={5} w="100%">
        <PostedBy author={post.author} createdDate={post.createdDate} />
        <Box wordBreak="break-word" whiteSpace="pre-wrap">
          {isEditing ? editContent : displayContent}
        </Box>
        <Box
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PostActionBar
            authorId={post.author.id}
            postId={post.id}
            comments={0}
            setIsEditing={setIsEditing}
          />
        </Box>
      </Flex>
    </Flex>
  );

  return clickable ? (
    <NextLink href={`/post/${post.id}`}>{body}</NextLink>
  ) : (
    <>{body}</>
  );
};
