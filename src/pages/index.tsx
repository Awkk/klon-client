import { Link } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { urqlClientConfig } from "../utils/urqlClientConfig";
import NextLink from "next/link";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      <NextLink href="/post/create">
        <Link>Create Post</Link>
      </NextLink>
      {data?.posts.map(({ id, title, text }) => (
        <div key={id}>
          <div>{title}</div>
          <div>{text}</div>
        </div>
      ))}
    </Layout>
  );
};

export default withUrqlClient(urqlClientConfig)(Home);
