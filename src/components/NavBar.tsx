import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/button";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching }, logout] = useLogoutMutation();
  const [{ data }, me] = useMeQuery({
    requestPolicy: "cache-and-network",
  });

  return (
    <Flex bg="darkgray" p={"4"}>
      <Box ml={"auto"}>
        {data?.me ? (
          <Flex>
            <Box mr={5}>{data.me.username}</Box>
            <Button
              variant={"link"}
              isLoading={fetching}
              onClick={async () => {
                await logout();
                me();
              }}
            >
              Log Out
            </Button>
          </Flex>
        ) : (
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
        )}
      </Box>
    </Flex>
  );
};
