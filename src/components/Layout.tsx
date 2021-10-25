import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { NavBar } from "./NavBar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Box minH="100vh" bgColor={bgColor}>
      <NavBar />
      <Flex justifyContent="center" p="2" flex="1">
        {children}
      </Flex>
    </Box>
  );
};
