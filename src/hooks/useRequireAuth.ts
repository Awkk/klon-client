import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { loginRequired } from "../utils/toastOptions";

export const useRequireAuth = () => {
  const [{ data, fetching }] = useMeQuery({
    requestPolicy: "network-only",
  });
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!fetching && !data?.me) {
      toast(loginRequired);
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [data, fetching, router, toast]);
};
