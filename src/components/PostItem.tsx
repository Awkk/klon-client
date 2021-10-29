import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { PostFragmentFragment } from "../generated/graphql";
import { PostActionBar } from "./PostActionBar";
import { PostContent } from "./PostContent";
import { PostedBy } from "./PostedBy";
import { PostUpdateForm } from "./PostUpdateForm";
import { VoteSection } from "./VoteSection";

type PostItemProps = {
  post: PostFragmentFragment & {
    text?: string;
  };
  listMode?: boolean;
};

export const PostItem = ({ post, listMode }: PostItemProps) => {
  const router = useRouter();
  const editParam = router.query.editing === "true";
  const [isEditing, setIsEditing] = useState<boolean>(editParam);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");

  const body = (
    <Flex
      w="100%"
      px="2"
      pt="2"
      pb="1"
      bgColor={bgColor}
      borderWidth="0.5px"
      borderColor={borderColor}
      _first={{ borderTopRadius: "md" }}
      _last={{ borderBottomRadius: "md" }}
      cursor={listMode ? "pointer" : "default"}
      _hover={listMode ? { borderColor: hoverBorderColor } : undefined}
    >
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
        alignItems="flex-start"
      >
        <VoteSection
          id={post.id}
          score={post.score}
          voteStatus={post.voteStatus}
        />
      </Box>
      <Flex direction={"column"} ml={5} w="100%">
        <PostedBy author={post.author} createdDate={post.createdDate} />
        <Box wordBreak="break-word" whiteSpace="pre-wrap">
          {isEditing ? (
            <PostUpdateForm post={post} setIsEditing={setIsEditing} />
          ) : (
            <PostContent post={post} listMode={listMode} />
          )}
        </Box>
        <Box
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PostActionBar
            authorId={post.author.id}
            postId={post.id}
            comments={0}
            setIsEditing={setIsEditing}
          />
        </Box>
      </Flex>
    </Flex>
  );

  return listMode ? (
    <NextLink href={`/post/${post.id}`}>{body}</NextLink>
  ) : (
    <>{body}</>
  );
};
