import { useQuery } from "./useQuery";

export function useCurrentUser() {
  const { data } = useQuery({
    method: "getCurrentUser",
  });

  return data ?? null;
}