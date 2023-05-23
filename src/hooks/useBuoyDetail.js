import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBuoyData = async (id) => {
  return await axios.get(`https://api.odn-it.com/devices/${id}/`);
};

export const useBuoyDetail = (id) => {
  return useQuery(
    ["buoy", id],
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
        const detailData = data?.data;
        console.log(detailData);
        return detailData;
      },
    }
  );
};
