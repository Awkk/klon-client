import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { NavBar } from "./NavBar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  return (
    <Flex minH="100vh" direction="column">
      <NavBar />
      <Flex justifyContent="center" p="2" flex="1" bgColor={bgColor}>
        {children}
      </Flex>
    </Flex>
  );
};
