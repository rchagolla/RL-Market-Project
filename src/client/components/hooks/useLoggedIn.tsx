import { useQuery } from "./useQuery";
import { useSessionInfo } from "./useSessionInfo";

type User = {
  username: string;
  bio: string;
  language: string;
};

export function useLoggedInUser(): User | null {
  const sessionInfo = useSessionInfo();
  const userId = sessionInfo?.userId ?? null;

  const { data } = useQuery(
    {
      method: "getUser",
      enabled: userId != null,
    },
    userId ?? 0
  );

  return data ?? null;
}