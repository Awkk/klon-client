import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useUpdateCommentMutation } from "../generated/graphql";
import { createCommentValidation } from "../utils/validationSchemas";
import { InputField } from "./InputField";

interface CommentUpdateFormProps {
  id: number;
  text: string;
  setIsEditing: (flag: boolean) => void;
}

interface CommentUpdateFormData {
  text: string;
}

export const CommentUpdateForm: React.FC<CommentUpdateFormProps> = ({
  id,
  text,
  setIsEditing,
}) => {
  const [, updateComment] = useUpdateCommentMutation();

  const initialValues: CommentUpdateFormData = {
    text: text,
  };

  return (
    <Box my="3">
      <Formik
        initialValues={initialValues}
        validationSchema={createCommentValidation}
        onSubmit={async (values) => {
          const result = await updateComment({
            id: id,
            text: values.text,
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
};
