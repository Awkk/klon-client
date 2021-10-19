import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useRequireAuth = () => {
  const [{ data, fetching }] = useMeQuery({
    requestPolicy: "network-only",
  });
  const router = useRouter();

  useEffect(() => {
    console.log("fetching, data", fetching, data);
    if (!fetching && !data?.me) {
      console.log("useRequireAuth redirect:", router.pathname);
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [data, fetching, router]);
};
