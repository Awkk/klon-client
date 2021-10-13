import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { urqlClientConfig } from "../utils/urqlClientConfig";

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />
      {data?.posts.map(({ id, title, text }) => (
        <div key={id}>
          <div>{title}</div>
          <div>{text}</div>
        </div>
      ))}
    </>
  );
};

export default withUrqlClient(urqlClientConfig)(Home);
