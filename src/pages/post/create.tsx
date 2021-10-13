import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Formik, Form, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useCreatePostMutation } from "../../generated/graphql";
import { urqlClientConfig } from "../../utils/urqlClientConfig";

interface FormData {
  title: string;
  text: string;
}

const initialValues: FormData = {
  title: "",
  text: "",
};

const CreatePost: React.FC<{}> = ({}) => {
  const [, createPost] = useCreatePostMutation();

  const submitPost = async (values: FormData, {}: FormikHelpers<FormData>) => {
    console.log(values);
    await createPost({ input: values });
    console.log();
  };

  return (
    <Wrapper variant="small">
      <Formik initialValues={initialValues} onSubmit={submitPost}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" placeholder="title" />
            <Box mt={4}>
              <InputField name="text" label="Text" placeholder="text" />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variant="solid"
              colorScheme="blackAlpha"
            >
              POST
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(urqlClientConfig)(CreatePost);
