import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { urqlClientConfig } from "../config/urqlClientConfig";
import { theme } from "../../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default withUrqlClient(urqlClientConfig)(MyApp);
