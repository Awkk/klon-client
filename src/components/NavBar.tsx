import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button, IconButton } from "@chakra-ui/button";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Spinner } from "@chakra-ui/react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching: meFetching }] = useMeQuery();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  let links;

  if (meFetching) {
    // Fetching user data
    links = <Spinner />;
  } else if (data?.me) {
    // User logged in
    links = (
      <Flex align={"center"}>
        <Button size="sm" variant="ghost" colorScheme="teal" fontSize="md">
          {data.me.username}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          colorScheme="teal"
          isLoading={logoutFetching}
          onClick={async () => {
            await logout();
          }}
        >
          Log Out
        </Button>
      </Flex>
    );
  } else {
    // User not logged in
    links = (
      <>
        <NextLink href="/login">
          <Button mr="2" size="sm" variant="outline" colorScheme="teal">
            Log In
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button size="sm" colorScheme="teal">
            Sign Up
          </Button>
        </NextLink>
      </>
    );
  }

  return (
    <Box
      w="100%"
      borderBottom="1px"
      borderBottomColor={borderColor}
      px="4"
      py="0.5"
      position="sticky"
      top={0}
      zIndex={1}
      bgColor={bgColor}
    >
      <Flex
        justifyItems="space-between"
        alignItems="center"
        maxW="7xl"
        mx="auto"
      >
        <Box>
          <NextLink href="/">
            <Text mx="4" cursor="pointer" fontSize="3xl" fontWeight="bold">
              Klon
            </Text>
          </NextLink>
        </Box>
        <Flex ml="auto" mr="1" align="center">
          {links}
        </Flex>
        <IconButton
          variant="ghost"
          colorScheme="teal"
          aria-label="Call Sage"
          fontSize="20px"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );
};
