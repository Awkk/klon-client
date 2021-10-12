import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { urqlClientConfig } from "../utils/urqlClientConfig";

const Home: NextPage = () => (
  <>
    <NavBar />
    <div>Hello World</div>
  </>
);

export default withUrqlClient(urqlClientConfig)(Home);
