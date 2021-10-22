import { Flex } from "@chakra-ui/layout";
import React from "react";
import { NavBar } from "./NavBar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Flex justifyContent="center" p="2">
        {children}
      </Flex>
    </>
  );
};
