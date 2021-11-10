import { Button } from "@chakra-ui/button";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Divider, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { urqlClientConfig } from "../../config/urqlClientConfig";
import { useCreatePostMutation } from "../../generated/graphql";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { createPostValidation } from "../../utils/validationSchemas";
import Head from "next/head";

interface CreatePostFormData {
  title: string;
  text: string;
  link?: string;
}

const initialValues: CreatePostFormData = {
  title: "",
  text: "",
  link: "",
};

const CreatePost: React.FC<{}> = ({}) => {
  useRequireAuth();
  const [_, createPost] = useCreatePostMutation();
  const router = useRouter();
  const dividerColor = useColorModeValue("gray.800", "gray.600");
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const submitPost = async (
    values: CreatePostFormData,
    _: FormikHelpers<CreatePostFormData>
  ) => {
    const result = await createPost({ input: values });
    if (!result.error) {
      const newPostId = result.data?.createPost.id;
      router.push(`/post/${newPostId}`);
    }
  };

  return (
    <>
      <Head>
        <title>Create Post - Klon</title>
      </Head>
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
          validationSchema={createPostValidation}
          onSubmit={submitPost}
          validateOnBlur={false}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing="4">
                <InputField name="title" label="Title" placeholder="Title" />
                <InputField
                  name="link"
                  label="Link"
                  placeholder="Link (optional)"
                />
                <InputField
                  name="text"
                  label="Text"
                  placeholder="Text (optional)"
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
    </>
  );
};

export default withUrqlClient(urqlClientConfig)(CreatePost);
