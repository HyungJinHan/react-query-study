import { useQuery } from "@tanstack/react-query";
import { heroRequest } from "../utils/axiosUtil";

const getHeroesData = async ({ queryKey }) => {
  const pageNum = queryKey[1];
  return await heroRequest({ url: `/superheroes?_limit=5&_page=${pageNum}` });
};

export const useHeroes = (pageNum) => {
  return useQuery(["heroes", pageNum], getHeroesData, {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
    refetchOnMount: true,
    retry: 2, // error시 fetch 재시도
    // refetchInterval: 5000, // polling (시간에 따라 refetch)
    // refetchIntervalInBackground: false,
    // enabled: false,
    select: (data) => {
      const heroes = data?.data.map((hero) => hero);
      return heroes;
    },
  });
};

export const useNextHeroes = (pageNum) => {
  return useQuery(["heroes", pageNum + 1], getHeroesData, {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
    refetchOnMount: true,
    retry: 2, // error시 fetch 재시도
    // refetchInterval: 5000, // polling (시간에 따라 refetch)
    // refetchIntervalInBackground: false,
    // enabled: false,
    select: (data) => {
      const heroes = data?.data.map((hero) => hero);
      return heroes;
    },
  });
};
