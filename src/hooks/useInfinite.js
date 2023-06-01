import { useInfiniteQuery } from "@tanstack/react-query";
import { buoyRequest } from "../utils/axiosUtil";

const getOxygenData = async ({ queryKey, pageParam = 1 }) => {
  const id = queryKey[1];
  return await buoyRequest({ url: `/${id}/oxygens/?size=3&page=${pageParam}` });
};

export const useInfiniteOxygen = (id, pageCount) => {
  return useInfiniteQuery(["oxygen-infinite", id], getOxygenData, {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
    refetchOnMount: true,
    retry: 2, // error시 fetch 재시도
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length < pageCount && allPages.length + 1;
    },
  });
};
