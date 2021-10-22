import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { errorsToMap } from "../utils/errorsToMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { urqlClientConfig } from "../config/urqlClientConfig";

interface LoginProps {}

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const [_, login] = useLoginMutation();
  const router = useRouter();

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
    <Box w="100%" maxW="md" m="3">
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
            <Box mt={4}>
              <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variant="solid"
              colorScheme="blackAlpha"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withUrqlClient(urqlClientConfig)(Login);
