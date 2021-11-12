import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useCreateCommentMutation } from "../generated/graphql";
import { createCommentValidation } from "../utils/validationSchemas";
import { InputField } from "./InputField";

interface CreateCommentWidgetProps {
  postId: number;
}

interface FormData {
  text: string;
}

const initialValues: FormData = {
  text: "",
};

export const CreateCommentWidget: React.FC<CreateCommentWidgetProps> = ({
  postId,
}) => {
  const [, createComment] = useCreateCommentMutation();

  return (
    <Flex w="100%">
      <Box w="100%">
        <Formik
          initialValues={initialValues}
          validationSchema={createCommentValidation}
          validateOnBlur={false}
          onSubmit={async (value, { resetForm }) => {
            await createComment({ postId: postId, text: value.text });
            resetForm();
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                name="text"
                placeholder="Comment your thoughts here"
                textarea
              />
              <Flex justifyContent="flex-end">
                <Button
                  mt="2"
                  size="sm"
                  type="submit"
                  isLoading={isSubmitting}
                  variant="solid"
                  colorScheme="teal"
                >
                  Comment
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
