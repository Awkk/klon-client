import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/button";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching: meFetching }, me] = useMeQuery({
    requestPolicy: "cache-and-network",
  });

  let links;

  if (meFetching) {
    // Show nothing when fetching user data
  } else if (data?.me) {
    // User logged in
    links = (
      <Flex>
        <Box mr={5}>{data.me.username}</Box>
        <Button
          variant={"link"}
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
          <Link color={"white"} mr={"5"}>
            Log In
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color={"white"}>Sign Up</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex bg="darkgray" p={"4"}>
      <Box ml={"auto"}>{links}</Box>
    </Flex>
  );
};
