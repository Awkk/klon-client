import { Box, Stack } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { PostPage } from "../../components/PostPage";
import { urqlClientConfig } from "../../config/urqlClientConfig";
import { postPerPageLimit } from "../../constants/post";
import { PostsQueryVariables } from "../../generated/graphql";

const User: NextPage = () => {
  const router = useRouter();
  const userId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [pageVariables, setPageVariables] = useState<PostsQueryVariables[]>([]);
  const [nextPageVariable, setNextPageVariable] =
    useState<PostsQueryVariables | null>(null);
  const pageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initial pageVariable when userId is parsed from router query
    if (userId !== -1) {
      setPageVariables([
        {
          limit: postPerPageLimit,
          cursor: null as null | string,
          userId: userId,
        },
      ]);
    }
  }, [userId]);

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
    <>
      <Head>
        <title>User - Klon</title>
      </Head>
      <Stack maxW="8xl" w="100%" spacing="4" py="2" ref={pageListRef}>
        <Box>
          {pageVariables.map((variables, i) => {
            return (
              <PostPage
                key={"" + variables.cursor}
                variables={variables}
                isLastPage={i === pageVariables.length - 1}
                setNextCursor={(cursor) =>
                  setNextPageVariable({
                    limit: postPerPageLimit,
                    cursor: cursor,
                    userId: userId,
                  })
                }
              />
            );
          })}
        </Box>
      </Stack>
    </>
  );
};

export default withUrqlClient(urqlClientConfig)(User);
