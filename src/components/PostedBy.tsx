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
import { timeAgo } from "../utils/dateFormat";

type Author = {
  id: number;
  username: string;
};

type PostedByProps = {
  author: Author;
  createdDate: string;
  short?: boolean;
};

export const PostedBy = ({ author, createdDate, short }: PostedByProps) => {
  const infoTextColor = useColorModeValue("gray.500", "gray.400");
  const createdDateObj = new Date(createdDate);
  return (
    <Flex fontSize="xs" color={infoTextColor} whiteSpace="pre-wrap">
      {!short ? <Text>Posted by </Text> : null}
      <NextLink href="/user/[id]" as={`/user/${author.id}`}>
        <Link>{author.username}</Link>
      </NextLink>
      <Text>{" • "}</Text>
      <Tooltip label={createdDateObj.toLocaleString()}>
        <Box _hover={{ textDecoration: "underline" }}>
          {short
            ? timeAgo.format(createdDateObj, "mini-now")
            : timeAgo.format(createdDateObj)}
        </Box>
      </Tooltip>
    </Flex>
  );
};
