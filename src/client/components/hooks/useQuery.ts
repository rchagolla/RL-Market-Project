import {
  Updater,
  UseQueryOptions,
  useQueryClient,
  useQuery as useTanstackQuery,
} from "@tanstack/react-query";
import { api } from "../../client";

type APIType = typeof api;

// NOTE: Derived from https://github.com/fgnass/react-api-query/blob/main/src/query.ts

export function useQuery<
  T extends keyof APIType,
  TQueryFnData = ReturnType<APIType[T]>,
  TData = Awaited<TQueryFnData>,
>(
  opts: T | (UseQueryOptions<TData> & { method: T }),
  ...args: Parameters<APIType[T]>
) {
  if (typeof opts !== "object") {
    opts = { method: opts };
  }

  const { method, ...queryOpts } = opts;
  const queryKey = [method, ...args] as const;
  const apiFn: (...args: Parameters<APIType[T]>) => TQueryFnData = api[
    method
  ] as any;

  const queryFn = () => apiFn.apply(api, args);
  const result = useTanstackQuery<TQueryFnData, Error, TData>({
    queryKey,
    queryFn,
    ...(queryOpts as any),
  });

  const queryClient = useQueryClient();

  return {
    ...result,
    queryKey,
    update: (updater: Updater<TData | undefined, TData | undefined>) => {
      queryClient.setQueryData(queryKey, updater);
    },
    invalidate: () => {
      queryClient.invalidateQueries(queryKey);
    },
    removeQuery: () => {
      queryClient.removeQueries(queryKey);
    },
  };
}