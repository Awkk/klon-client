import {
  ClientOptions,
  CombinedError,
  dedupExchange,
  errorExchange,
  fetchExchange,
  gql,
} from "@urql/core";
import { NextUrqlClientConfig, SSRExchange } from "next-urql";
import Router from "next/router";
import { cacheExchange } from "@urql/exchange-graphcache";
import { VoteMutationVariables } from "../generated/graphql";

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
    cacheExchange({
      updates: {
        Mutation: {
          vote(_result, args, cache) {
            const { postId, value } = args as VoteMutationVariables;
            const voteInfo = gql`
              fragment _ on Post {
                score
                voteStatus
              }
            `;
            const data = cache.readFragment(voteInfo, { id: postId });

            if (data.voteStatus !== value) {
              const newScore = data.score + value - data.voteStatus;
              cache.writeFragment(voteInfo, {
                id: postId,
                score: newScore,
                voteStatus: value,
              });
            }
          },
        },
      },
    }),
    errorExchange({
      onError,
    }),
    fetchExchange,
  ],
});
