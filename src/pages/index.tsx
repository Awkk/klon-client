import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { PostsQueryVariables, usePostsQuery } from "../generated/graphql";
import { urqlClientConfig } from "../config/urqlClientConfig";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { Button } from "@chakra-ui/button";
import React, { useState } from "react";

type PageProps = {
  variables: PostsQueryVariables;
  isLastPage: boolean;
  onLoadMore: (cursor: string) => void;
};

const Page = ({ variables, isLastPage, onLoadMore }: PageProps) => {
  const [{ data, fetching }] = usePostsQuery({ variables });

  return (
    <>
      <Box>
        {data?.posts.posts.map((post) =>
          !post ? null : (
            <Flex key={post.id} p={5} borderWidth="1px">
              <Box flex={1}>
                <Flex>
                  <Box mr={"auto"}>{post.id}</Box>
                  <Box>{post.createdDate}</Box>
                </Flex>
                <Heading fontSize="xl">{post.title}</Heading>
              </Box>
            </Flex>
          )
        )}
      </Box>
      {(isLastPage && fetching) || (isLastPage && data?.posts.hasMore) ? (
        <Flex>
          <Button
            onClick={() => {
              if (data?.posts) {
                onLoadMore(
                  data.posts.posts[data.posts.posts.length - 1].createdDate
                );
              }
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

const limit = 20;

const Home: NextPage = () => {
  const [pageVariables, setPageVariables] = useState([
    { limit, cursor: null as null | string },
  ]);

  return (
    <Layout>
      <NextLink href="/post/create">
        <Link>Create Post</Link>
      </NextLink>
      {pageVariables.map((variables, i) => {
        return (
          <Page
            key={"" + variables.cursor}
            variables={variables}
            isLastPage={i === pageVariables.length - 1}
            onLoadMore={(cursor) =>
              setPageVariables([...pageVariables, { limit, cursor }])
            }
          />
        );
      })}
    </Layout>
  );
};

export default withUrqlClient(urqlClientConfig)(Home);
