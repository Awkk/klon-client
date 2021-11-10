import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  PostFragmentFragment,
  useUpdatePostMutation,
} from "../generated/graphql";
import { createPostValidation } from "../utils/validationSchemas";
import { InputField } from "./InputField";

interface PostUpdateFormProps {
  post: PostFragmentFragment & {
    text?: string | null;
  };
  setIsEditing: (flag: boolean) => void;
}

interface PostUpdateFormData {
  title: string;
  text: string;
  link?: string;
}

export const PostUpdateForm: React.FC<PostUpdateFormProps> = ({
  post,
  setIsEditing,
}) => {
  const [, updatePost] = useUpdatePostMutation();

  const initialValues: PostUpdateFormData = {
    title: post.title,
    text: post.text ? post.text : "",
    link: post.link ? post.link : "",
  };

  return (
    <Box my="3">
      <Formik
        initialValues={initialValues}
        validationSchema={createPostValidation}
        onSubmit={async (values) => {
          const result = await updatePost({
            id: post.id,
            input: {
              title: values.title,
              text: values.text,
              link: values.link,
            },
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
              <InputField name="link" placeholder="Link (optional)" />
              <InputField name="text" placeholder="Text (optional)" textarea />
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
};
