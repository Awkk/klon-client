import { createStandaloneToast } from "@chakra-ui/react";
import {
  ClientOptions,
  CombinedError,
  dedupExchange,
  errorExchange,
  fetchExchange,
  gql,
} from "@urql/core";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig, SSRExchange } from "next-urql";
import Router from "next/router";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  PostsDocument,
  PostsQuery,
  RegisterMutation,
  VoteMutationVariables,
} from "../generated/graphql";
import { loginRequired } from "../utils/toastOptions";

const onError = (error: CombinedError) => {
  if (error.message.includes("not authenticated")) {
    const toast = createStandaloneToast();
    toast(loginRequired);
    Router.replace("/login");
  }
};

const invalidAllPosts = (cache: Cache) => {
  cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "posts")
    .forEach((field) => {
      cache.invalidate("Query", "posts", field.arguments);
    });
};

const resetVoteStatus = (cache: Cache) => {
  cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "posts")
    .forEach((field) => {
      console.log("field", field);
      cache.updateQuery(
        { query: PostsDocument, variables: field.arguments ?? undefined },
        (data: PostsQuery | null) => {
          console.log("data", data);
          if (data) {
            data.posts.posts.forEach((post) => {
              post.voteStatus = 0;
            });
          }
          return data;
        }
      );
    });
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
          vote(_result, args, cache, _info) {
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
          register(result: RegisterMutation, _args, cache, _info) {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
              if (!result.register.errors) {
                return { me: result.register.user };
              }
              return data;
            });
            resetVoteStatus(cache);
          },
          login(result: LoginMutation, _args, cache, _info) {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
              if (!result.login.errors) {
                return { me: result.login.user };
              }
              return data;
            });
            invalidAllPosts(cache);
          },
          logout(_result, _args, cache, _info) {
            cache.updateQuery(
              { query: MeDocument },
              (_data: MeQuery | null) => ({ me: null })
            );
            resetVoteStatus(cache);
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
