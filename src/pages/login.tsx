import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { urqlClientConfig } from "../config/urqlClientConfig";
import { useLoginMutation } from "../generated/graphql";
import { errorsToMap } from "../utils/errorsToMap";

interface LoginProps {}

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const [_, login] = useLoginMutation();
  const router = useRouter();
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const submitLogin = async (
    values: FormData,
    { setErrors }: FormikHelpers<FormData>
  ) => {
    const result = await login({ auth: values });
    const userResponse = result.data?.login;
    if (userResponse?.errors) {
      // Convert errors to map, with fields as key and message as value
      setErrors(errorsToMap(userResponse?.errors));
    } else if (userResponse?.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <Box
      w="100%"
      maxW="sm"
      h="fit-content"
      m="4"
      p="7"
      bgColor={bgColor}
      borderRadius="2xl"
      overflow="hidden"
    >
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={submitLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="username"
            />
            <Box mt="4">
              <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />
            </Box>
            <Button
              width="100%"
              mt="5"
              type="submit"
              isLoading={isSubmitting}
              variant="solid"
              colorScheme="teal"
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withUrqlClient(urqlClientConfig)(Login);
