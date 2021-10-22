import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button, IconButton } from "@chakra-ui/button";
import { SunIcon } from "@chakra-ui/icons";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching: meFetching }, me] = useMeQuery({
    requestPolicy: "network-only",
  });

  let links;

  if (meFetching) {
    // Show nothing when fetching user data
  } else if (data?.me) {
    // User logged in
    links = (
      <Flex align={"center"}>
        <Button
          mr="2"
          size="sm"
          variant="ghost"
          colorScheme="teal"
          fontSize="md"
          textColor='black'
        >
          {data.me.username}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          colorScheme="teal"
          isLoading={logoutFetching}
          onClick={async () => {
            await logout();
            me();
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
    <Flex bg="gray.50" px="4" py="0.5" position="sticky" top={0} zIndex={1}>
      <Flex flex={1} m="auto" align="center" maxW="7xl">
        <Box>
          <NextLink href="/">
            <Text mr="5" cursor="pointer" fontSize="3xl" fontWeight="bold">
              Klon
            </Text>
          </NextLink>
        </Box>
        <Box ml="auto" mr="1">
          {links}
        </Box>
        <IconButton
          variant="ghost"
          colorScheme="teal"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<SunIcon />}
        />
      </Flex>
    </Flex>
  );
};
