import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buoyRequest } from "../utils/axiosUtil";

const getBuoyData = async (id) => {
  return await buoyRequest({ url: `/${id}/` });
};

export const useBuoyDetail = (id) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["buoy-detail", id],
    // ["buoy", id] -> queryFn
    () => getBuoyData(id),
    {
      cacheTime: 5 * 60 * 1000, // 5분
      staleTime: 1 * 60 * 1000, // 1분
      refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
      refetchOnMount: true,
      retry: 2, // error시 fetch 재시도
      // refetchInterval: 5000, // polling (시간에 따라 refetch)
      // refetchIntervalInBackground: false,
      select: (data) => {
        const detailData = data.data;
        return detailData;
      },
      initialData: () => {
        const cacheData = queryClient
          .getQueryData(["buoy"])
          ?.data?.results?.find((data) => data.device_id === parseInt(id));

        if (cacheData) {
          console.log({ cacheData: cacheData });
          return { data: cacheData };
        } else {
          console.log({ cacheData: undefined });
          return undefined;
        }
      },
    }
  );
};
