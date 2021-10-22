import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { errorsToMap } from "../utils/errorsToMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { urqlClientConfig } from "../config/urqlClientConfig";

interface RegisterProps {}

interface FormData {
  username: string;
  password: string;
}

const Register: React.FC<RegisterProps> = () => {
  const [_, register] = useRegisterMutation();
  const router = useRouter();

  const submitRegister = async (
    values: FormData,
    { setErrors }: FormikHelpers<FormData>
  ) => {
    const result = await register({ auth: values });
    const userResponse = result.data?.register;
    if (userResponse?.errors) {
      // Convert errors to map, with fields as key and message as value
      setErrors(errorsToMap(userResponse?.errors));
    } else if (userResponse?.user) {
      router.push("/");
    }
  };

  return (
    <Box w="100%" maxW="md" m="3">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={submitRegister}
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
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withUrqlClient(urqlClientConfig)(Register);
