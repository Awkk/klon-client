import { ClientOptions } from "@urql/core";
import { NextUrqlClientConfig, SSRExchange } from "next-urql";

export const urqlClientConfig: NextUrqlClientConfig = (
  _ssrExchange: SSRExchange
): ClientOptions => ({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: {
    credentials: "include",
  },
});
