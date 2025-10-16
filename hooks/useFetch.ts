import { get } from "@/utilities/apiclient";
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

interface FetchProps<TData = unknown, TError = unknown> {
  url: string;
  key: QueryKey; 
  options?: UseQueryOptions<TData, TError>; 
}

export default function useFetch<TData = unknown, TError = unknown>({
  key,
  url,
  options,
}: FetchProps<TData, TError>) {
  const fetchData = async (): Promise<TData> => {
    try {
      const res = await get(url);
      return res as TData;
    } catch (e) {
      throw e as TError;
    }
  };

  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: fetchData,
    staleTime: 0, 
    gcTime: 5 * 60 * 1000, 
    refetchInterval: 200000, 
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 2, 
    networkMode: "online", 
    ...options,
  });
}
