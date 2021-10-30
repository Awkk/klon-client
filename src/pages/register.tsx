import { Box, Button, useColorModeValue, VStack } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { urqlClientConfig } from "../config/urqlClientConfig";
import { useRegisterMutation } from "../generated/graphql";
import { errorsToMap } from "../utils/errorsToMap";
import { registerValidation } from "../utils/validationSchemas";

interface RegisterProps {}

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormData = {
  username: "",
  password: "",
  confirmPassword: "",
};

const Register: React.FC<RegisterProps> = () => {
  const [_, register] = useRegisterMutation();
  const router = useRouter();
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const submitRegister = async (
    values: FormData,
    { setErrors }: FormikHelpers<FormData>
  ) => {
    const result = await register({
      auth: { username: values.username, password: values.password },
    });
    const userResponse = result.data?.register;
    if (userResponse?.errors) {
      // Convert errors to map, with fields as key and message as value
      setErrors(errorsToMap(userResponse?.errors));
    } else if (userResponse?.user) {
      router.push("/");
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
        initialValues={initialValues}
        validationSchema={registerValidation}
        onSubmit={submitRegister}
        validateOnBlur={false}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <InputField
                name="username"
                label="Username"
                placeholder="username"
              />

              <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />

              <InputField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="password"
                type="password"
              />

              <Button
                width="100%"
                mt="5"
                type="submit"
                isLoading={isSubmitting}
                variant="solid"
                colorScheme="teal"
              >
                Sign Up
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withUrqlClient(urqlClientConfig)(Register);
