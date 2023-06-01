import { useQueries } from "@tanstack/react-query";
import { buoyRequest } from "../utils/axiosUtil";

const getOxygenData = (id) => {
  return buoyRequest({ url: `/${id}/oxygens/` });
};

export const useDynamicParallel = ({ ids }) => {
  return useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["oxygen", id],
        queryFn: () => getOxygenData(id),
        cacheTime: 5 * 60 * 1000, // 5분
        staleTime: 1 * 60 * 1000, // 1분
        refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
        refetchOnMount: true,
        retry: 2, // error시 fetch 재시도
        enable: !!id,
        // refetchInterval: 5000, // polling (시간에 따라 refetch)
        // refetchIntervalInBackground: false,
        select: (data) => {
          const oxygenData = data?.data.results?.map((res) => res);
          return oxygenData[0];
        },
      };
    }),
  });
};
