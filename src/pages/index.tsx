import { Box, Stack } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useRef, useState } from "react";
import { CreatePostWidget } from "../components/CreatePostWidget";
import { PostPage } from "../components/PostPage";
import { urqlClientConfig } from "../config/urqlClientConfig";
import { postPerPageLimit } from "../constants/post";
import { PostsQueryVariables, useMeQuery } from "../generated/graphql";

const Home: NextPage = () => {
  const [{ data }] = useMeQuery();
  const [pageVariables, setPageVariables] = useState<PostsQueryVariables[]>([
    { limit: postPerPageLimit, cursor: null as null | string },
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
    <Stack maxW="8xl" w="100%" spacing="4" py="2" ref={pageListRef}>
      {data?.me ? <CreatePostWidget /> : null}
      <Box>
        {pageVariables.map((variables, i) => {
          return (
            <PostPage
              key={"" + variables.cursor}
              variables={variables}
              isLastPage={i === pageVariables.length - 1}
              setNextCursor={(cursor) =>
                setNextPageVariable({ limit: postPerPageLimit, cursor })
              }
            />
          );
        })}
      </Box>
    </Stack>
  );
};

export default withUrqlClient(urqlClientConfig)(Home);
