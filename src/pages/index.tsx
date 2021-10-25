import { Box, Stack } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useRef, useState } from "react";
import { CreatePostWidget } from "../components/CreatePostWidget";
import { PostPage } from "../components/PostPage";
import { urqlClientConfig } from "../config/urqlClientConfig";
import { PostsQueryVariables } from "../generated/graphql";

const limit = 20;

const Home: NextPage = () => {
  const [pageVariables, setPageVariables] = useState<PostsQueryVariables[]>([
    { limit, cursor: null as null | string },
  ]);
  const [nextPageVariable, setNextPageVariable] =
    useState<PostsQueryVariables | null>(null);
  const pageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (pageListRef.current) {
        const { scrollHeight } = pageListRef.current;
        // Scrolled to end of page
        if (scrollHeight < window.innerHeight + window.scrollY) {
          // nextPageVariable is not already in pageVariables
          if (
            nextPageVariable &&
            pageVariables[pageVariables.length - 1].cursor !==
              nextPageVariable?.cursor
          ) {
            setPageVariables([...pageVariables, nextPageVariable]);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageVariable, pageVariables]);

  return (
    <Stack w={["100%", "75%"]} spacing="4" py="2" ref={pageListRef}>
      <CreatePostWidget />
      <Box>
        {pageVariables.map((variables, i) => {
          return (
            <PostPage
              key={"" + variables.cursor}
              variables={variables}
              isLastPage={i === pageVariables.length - 1}
              setNextCursor={(cursor) => setNextPageVariable({ limit, cursor })}
            />
          );
        })}
      </Box>
    </Stack>
  );
};

export default withUrqlClient(urqlClientConfig)(Home);
