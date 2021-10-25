import {
  Box,
  Flex,
  Link,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { format } from "timeago.js";

type Author = {
  id: number;
  username: string;
};

type PostedByProps = {
  author: Author;
  createdDate: string;
};

export const PostedBy = ({ author, createdDate }: PostedByProps) => {
  const infoTextColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex fontSize="xs" color={infoTextColor} whiteSpace="pre-wrap">
      <Text>Posted by </Text>
      <NextLink href="/user/[id]" as={`/user/${author.id}`}>
        <Link>{author.username}</Link>
      </NextLink>
      <Text> </Text>
      <Tooltip label={new Date(createdDate).toLocaleString()}>
        <Box _hover={{ textDecoration: "underline" }}>
          {format(createdDate)}
        </Box>
      </Tooltip>
    </Flex>
  );
};
