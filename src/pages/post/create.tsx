import { Button } from "@chakra-ui/button";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Divider, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { InputField } from "../../components/InputField";
import { urqlClientConfig } from "../../config/urqlClientConfig";
import { createPostLimit } from "../../constants/validation";
import { useCreatePostMutation } from "../../generated/graphql";
import { useRequireAuth } from "../../hooks/useRequireAuth";

interface FormData {
  title: string;
  text: string;
}

const initialValues: FormData = {
  title: "",
  text: "",
};

const CreatePost: React.FC<{}> = ({}) => {
  useRequireAuth();
  const [_, createPost] = useCreatePostMutation();
  const router = useRouter();
  const dividerColor = useColorModeValue("gray.800", "gray.600");
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const submitPost = async (values: FormData, _: FormikHelpers<FormData>) => {
    const result = await createPost({ input: values });
    if (!result.error) {
      const newPostId = result.data?.createPost.id;
      router.push(`/post/${newPostId}`);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(
        createPostLimit.title.maxLength,
        `Must be at most ${createPostLimit.title.maxLength} characters`
      )
      .required("Required"),
    text: Yup.string()
      .max(
        createPostLimit.text.maxLength,
        `Must be at most ${createPostLimit.text.maxLength} characters`
      )
      .required("Required"),
  });

  return (
    <Stack
      width="100%"
      maxW="lg"
      px="5"
      py="4"
      mt="3"
      spacing="3"
      bgColor={bgColor}
      borderRadius="md"
    >
      <Text fontSize="2xl" fontWeight="medium">
        Create a Post
      </Text>
      <Divider bgColor={dividerColor} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitPost}
        validateOnBlur={false}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing="4">
              <InputField name="title" label="Title" placeholder="Title" />
              <InputField
                name="text"
                label="Text"
                placeholder="Text"
                textarea
              />
              <Flex justifyContent="flex-end">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  variant="solid"
                  colorScheme="teal"
                >
                  POST
                </Button>
              </Flex>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default withUrqlClient(urqlClientConfig)(CreatePost);
