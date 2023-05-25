import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getHerosData = async ({ queryKey }) => {
  const pageNum = queryKey[1];

  return await axios.get(
    `http://localhost:5000/superheros?_limit=5&_page=${pageNum}`
  );
};

export const useHeros = (pageNum) => {
  return useQuery(
    ["heros", pageNum],
    // ["buoy"] -> queryFn
    getHerosData,
    {
      cacheTime: 5 * 60 * 1000, // 5분
      staleTime: 1 * 60 * 1000, // 1분
      refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
      refetchOnMount: true,
      retry: 2, // error시 fetch 재시도
      // refetchInterval: 5000, // polling (시간에 따라 refetch)
      // refetchIntervalInBackground: false,
      // enabled: false,
      select: (data) => {
        const heros = data?.data.map((hero) => hero);
        return heros;
      },
    }
  );
};
