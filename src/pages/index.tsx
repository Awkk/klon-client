import { Link } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { PostPage } from "../components/PostPage";
import { urqlClientConfig } from "../config/urqlClientConfig";

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
          <PostPage
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
