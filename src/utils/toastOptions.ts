import { UseToastOptions } from "@chakra-ui/toast";

export const loginRequired: UseToastOptions = {
  title: "Login Required.",
  status: "warning",
  duration: 4000,
  isClosable: true,
};
