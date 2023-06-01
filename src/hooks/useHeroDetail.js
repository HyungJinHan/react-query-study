import { useQuery, useQueryClient } from "@tanstack/react-query";
import { heroRequest } from "../utils/axiosUtil";

const getHeroDetail = ({ queryKey }) => {
  const id = queryKey[1];
  return heroRequest({ url: `/superheroes/${id}` });
};

export const useHeroDetail = (id, pageNum) => {
  const queryClient = useQueryClient();

  return useQuery(["hero-detail", id], getHeroDetail, {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
    refetchOnMount: true,
    retry: 2, // error시 fetch 재시도
    // refetchInterval: 5000, // polling (시간에 따라 refetch)
    // refetchIntervalInBackground: false,
    select: (data) => {
      const hero = data.data;
      return hero;
    },
    initialData: () => {
      const cacheData = queryClient
        .getQueryData(["heroes", pageNum])
        ?.data?.find((hero) => hero.id === parseInt(id));

      if (cacheData) {
        console.log({ cacheData: cacheData });
        return { data: cacheData };
      } else {
        console.log({ cacheData: undefined });
        return undefined;
      }
    },
  });
};
