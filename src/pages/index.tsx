import { Box, Stack } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { CreatePostWidget } from "../components/CreatePostWidget";
import { PostPage } from "../components/PostPage";
import { PostSortWidget } from "../components/PostSortWidget";
import { urqlClientConfig } from "../config/urqlClientConfig";
import { postPerPageLimit } from "../constants/post";
import {
  PostSort,
  PostsQueryVariables,
  SortOrder,
  SortPeriod,
  useMeQuery,
} from "../generated/graphql";

const Home: NextPage = () => {
  const [{ data }] = useMeQuery();
  const [sort, setSort] = useState<PostSort>(PostSort.CreatedDate);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [period, setPeriod] = useState<SortPeriod>(SortPeriod.All);
  const [pageVariables, setPageVariables] = useState<PostsQueryVariables[]>([
    {
      limit: postPerPageLimit,
      cursor: null,
      idCursor: null,
      sort: sort,
      order: order,
      period: period,
    },
  ]);
  const [nextPageVariable, setNextPageVariable] =
    useState<PostsQueryVariables | null>(null);
  const pageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setNextPageVariable(null);
    setPageVariables([
      {
        limit: postPerPageLimit,
        cursor: null,
        idCursor: null,
        sort: sort,
        order: order,
        period: period,
      },
    ]);
    console.log(sort, order, period);
  }, [sort, order, period]);

  useEffect(() => {
    const handleScroll = () => {
      if (pageListRef.current) {
        const { scrollHeight } = pageListRef.current;
        // Scrolled to end of page
        if (scrollHeight < window.innerHeight + window.scrollY) {
          // nextPageVariable is not already in pageVariables
          const lastPageVariable = pageVariables[pageVariables.length - 1];
          if (
            nextPageVariable &&
            lastPageVariable.idCursor !== nextPageVariable?.idCursor
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
        <title>Klon</title>
      </Head>
      <Stack maxW="siteMaxWidth" w="100%" spacing="3" ref={pageListRef}>
        {data?.me ? <CreatePostWidget /> : null}
        <PostSortWidget
          setSort={setSort}
          setOrder={setOrder}
          setPeriod={setPeriod}
        />
        <Box>
          {pageVariables.map((variables, i) => (
            <PostPage
              key={"" + variables.cursor + variables.idCursor}
              variables={variables}
              sort={sort}
              isLastPage={i === pageVariables.length - 1}
              setNextCursor={(cursor, idCursor) =>
                setNextPageVariable({
                  limit: postPerPageLimit,
                  cursor: cursor,
                  idCursor: idCursor,
                  order: order,
                  sort: sort,
                  period: period,
                })
              }
            />
          ))}
        </Box>
      </Stack>
    </>
  );
};

export default withUrqlClient(urqlClientConfig)(Home);
