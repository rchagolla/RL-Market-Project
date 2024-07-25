import { useQuery } from "./useQuery";

export function useSessionInfo() {
  const { data } = useQuery("getSessionInfo");
  return data;
}