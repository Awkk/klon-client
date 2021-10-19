import {
  cacheExchange,
  ClientOptions,
  CombinedError,
  dedupExchange,
  errorExchange,
  fetchExchange,
} from "@urql/core";
import { NextUrqlClientConfig, SSRExchange } from "next-urql";
import Router from "next/router";

const onError = (error: CombinedError) => {
  if (error.message.includes("not authenticated")) {
    Router.replace("/login");
  }
};

export const urqlClientConfig: NextUrqlClientConfig = (
  _ssrExchange: SSRExchange
): ClientOptions => ({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    errorExchange({
      onError,
    }),
    fetchExchange,
  ],
});
