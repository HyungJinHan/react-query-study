import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getOxygenData = async ({ queryKey }) => {
  const id = queryKey[1];
  const pageNum = queryKey[2];
  return await axios.get(
    `https://api.odn-it.com/devices/${id}/oxygens/?size=3&page=${pageNum}`
  );
};

const getNextOxygenData = async (nextPageUri) => {
  return await axios.get(`${nextPageUri}`);
};

export const useBuoyOxygen = (id, pageNum) => {
  return useQuery(["oxygen", id, pageNum], getOxygenData, {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
    refetchOnMount: true,
    retry: 2, // error시 fetch 재시도
    // refetchInterval: 5000, // polling (시간에 따라 refetch)
    // refetchIntervalInBackground: false,
    select: (data) => {
      const oxygenData = data?.data.results?.map((res) => res);
      console.log(data?.data.next);
      return oxygenData;
    },
  });
};

// export const useNextBuoyOxygen = (id, pageNum) => {
//   const { data: nextPage } = useQuery(["oxygen", id, pageNum], getOxygenData, {
//     // select: (data) => {
//     //   const nextPage = data?.data?.next;
//     //   console.log(nextPage);
//     //   return nextPage;
//     // },
//   });

//   const nextPageUri = nextPage?.data.next;

//   useQuery(["next", nextPageUri], () => getNextOxygenData(nextPageUri), {
//     enabled: !!nextPageUri,
//   });
//   console.log(nextPage);
//   return nextPageUri;
// };
