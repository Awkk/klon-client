import { Box, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PostPage } from "../../components/PostPage";
import { PostSortWidget } from "../../components/PostSortWidget";
import { urqlClientConfig } from "../../config/urqlClientConfig";
import { postPerPageLimit } from "../../constants/post";
import {
  PostSort,
  PostsQueryVariables,
  SortOrder,
  SortPeriod,
  useUserQuery,
} from "../../generated/graphql";

const User: NextPage = () => {
  const router = useRouter();
  const userId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [sort, setSort] = useState<PostSort>(PostSort.CreatedDate);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [period, setPeriod] = useState<SortPeriod>(SortPeriod.All);
  const [pageVariables, setPageVariables] = useState<PostsQueryVariables[]>([]);
  const [nextPageVariable, setNextPageVariable] =
    useState<PostsQueryVariables | null>(null);
  const pageListRef = useRef<HTMLDivElement | null>(null);
  const [{ data }] = useUserQuery({
    variables: { id: userId },
    pause: userId === -1,
  });

  useEffect(() => {
    // Initial pageVariable when userId is parsed from router query
    if (userId !== -1) {
      setPageVariables([
        {
          userId: userId,
          limit: postPerPageLimit,
          cursor: null,
          idCursor: null,
          sort: sort,
          order: order,
          period: period,
        },
      ]);
      setNextPageVariable(null);
    }
  }, [userId, order, period, sort]);

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

  const setNextCursor = useCallback(
    (cursor, idCursor) => {
      setNextPageVariable({
        userId: userId,
        limit: postPerPageLimit,
        cursor: cursor,
        idCursor: idCursor,
        sort: sort,
        order: order,
        period: period,
      });
    },
    [userId, sort, order, period]
  );

  return (
    <>
      <Head>
        <title>{data?.user ? data.user.username : "User"} - Klon</title>
      </Head>
      <Stack maxW="siteMaxWidth" w="100%" spacing="4" py="2" ref={pageListRef}>
        <Box>
          <Text fontSize="xl" fontWeight="semibold">{`${
            data?.user ? data.user.username : "User"
          }'s posts`}</Text>
        </Box>
        <PostSortWidget
          setSort={setSort}
          setOrder={setOrder}
          setPeriod={setPeriod}
        />
        <Box>
          {pageVariables.map((variables, i) => {
            return (
              <PostPage
                key={"" + variables.cursor}
                variables={variables}
                sort={sort}
                isLastPage={i === pageVariables.length - 1}
                setNextCursor={setNextCursor}
              />
            );
          })}
        </Box>
      </Stack>
    </>
  );
};

export default withUrqlClient(urqlClientConfig)(User);
