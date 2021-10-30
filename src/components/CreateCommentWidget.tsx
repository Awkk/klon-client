import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { commentLimit } from "../constants/validation";
import { useCreateCommentMutation } from "../generated/graphql";
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

const validationSchema = Yup.object({
  text: Yup.string()
    .max(
      commentLimit.text.maxLength,
      `Must be at most ${commentLimit.text.maxLength} characters`
    )
    .required("Required"),
});

export const CreateCommentWidget: React.FC<CreateCommentWidgetProps> = ({
  postId,
}) => {
  const [, createComment] = useCreateCommentMutation();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      w="100%"
      px="3"
      py="3"
      bgColor={bgColor}
      borderWidth="0.5px"
      borderTopWidth="0"
      borderColor={borderColor}
      borderBottomRadius="md"
    >
      <Box w="100%">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
