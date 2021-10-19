import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useRequireAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [data, fetching, router]);
};
