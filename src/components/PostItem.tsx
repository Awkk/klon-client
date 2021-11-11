import {
  Box,
  ChakraProps,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { PostFragmentFragment } from "../generated/graphql";
import { PostActionBar } from "./PostActionBar";
import { PostedBy } from "./PostedBy";
import { PostUpdateForm } from "./PostUpdateForm";
import { VoteSection } from "./VoteSection";

type PostItemProps = {
  post: PostFragmentFragment & {
    text?: string | null;
  };
  listMode?: boolean;
  styleProps?: ChakraProps;
};

export const PostItem = ({ post, listMode, styleProps }: PostItemProps) => {
  const router = useRouter();
  const editParam = router.query.editing === "true";
  const [isEditing, setIsEditing] = useState<boolean>(editParam);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.400");
  const infoTextColor = useColorModeValue("gray.500", "gray.400");
  const previewBgColor = useColorModeValue("gray.100", "gray.700");
  const linkColor = useColorModeValue("cyan.600", "cyan.500");

  const imageW = ["90px", "130px"];
  const imageH = ["90px", "90px"];

  let previewImgUrl;
  if (post.previewImg) {
    previewImgUrl = post.previewImg;
  } else {
    previewImgUrl = post.link ? "/urlPost.png" : "textPost.png";
  }

  const body = (
    <Flex
      w="100%"
      px={[0, 2]}
      pt={[1, 2]}
      pb={1}
      bgColor={bgColor}
      borderWidth="0.5px"
      borderColor={borderColor}
      _first={{ borderTopRadius: "md" }}
      _last={{ borderBottomRadius: "md" }}
      cursor={listMode ? "pointer" : "default"}
      _hover={listMode ? { borderColor: hoverBorderColor } : undefined}
      {...styleProps}
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
      {isEditing || !listMode ? null : (
        <Flex
          ml={[2, 3]}
          minW={imageW}
          minH={imageH}
          bgColor={previewBgColor}
          justifyContent="center"
          alignItems="center"
        >
          <Image
            w={post.previewImg ? imageW : "20px"}
            h={post.previewImg ? imageH : "20px"}
            objectFit={post.previewImg ? "cover" : "contain"}
            borderRadius="sm"
            src={previewImgUrl}
            fallbackSrc="/urlPost.png"
            alt={`preview image for ${post.title}`}
          />
        </Flex>
      )}
      <Flex
        direction={"column"}
        ml={[2, 3]}
        w="100%"
        justifyContent="space-between"
      >
        <Box>
          <PostedBy author={post.author} createdDate={post.createdDate} />
          <Box wordBreak="break-word" whiteSpace="pre-wrap">
            {isEditing ? (
              <PostUpdateForm post={post} setIsEditing={setIsEditing} />
            ) : (
              <>
                <Box mt="1">
                  <Text fontSize={listMode ? "md" : "lg"} fontWeight="medium">
                    {post.title}
                  </Text>
                </Box>
                {post.link ? (
                  <Box
                    mb="1"
                    width="fit-content"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Text noOfLines={1}>
                      <Link
                        fontSize="xs"
                        color={linkColor}
                        href={post.link}
                        isExternal
                      >
                        {post.link}
                      </Link>
                    </Text>
                  </Box>
                ) : null}
                {post.link && !listMode && ReactPlayer.canPlay(post.link) ? (
                  <Box my="3" mr="2" position="relative" pt="56.25%">
                    <ReactPlayer
                      url={post.link}
                      controls={true}
                      width="100%"
                      height="100%"
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </Box>
                ) : null}
                {post.link &&
                !listMode &&
                /\.(jpeg|jpg|gif|png)$/.test(post.link) ? (
                  <Box my="3">
                    <Image src={post.link} alt={`Image for ${post.title}`} />
                  </Box>
                ) : null}
                {post.text ? (
                  <Box my="1">
                    <Text fontSize="md">{post.text}</Text>
                  </Box>
                ) : null}
              </>
            )}
          </Box>
        </Box>
        <Flex
          direction={["column", "row"]}
          pr="2"
          justifyContent="space-between"
        >
          <PostActionBar
            authorId={post.author.id}
            postId={post.id}
            comments={post.commentsCount}
            setIsEditing={setIsEditing}
          />
          {!listMode ? (
            <Text fontSize="xs" color={infoTextColor}>
              {post.views === 1 ? "view" : "views"}: {post.views}
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );

  return listMode ? (
    <NextLink href={`/post/${post.id}`}>{body}</NextLink>
  ) : (
    <>{body}</>
  );
};
