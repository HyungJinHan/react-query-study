import { useQuery } from "@tanstack/react-query";
import { buoyRequest } from "../utils/axiosUtil";

const getNextData = ({ queryKey }) => {
  const id = queryKey[1];
  const pageNum = queryKey[2];
  return buoyRequest({ url: `/${id}/oxygens/?size=3&page=${pageNum}` });
};

export const useNextOxygen = (id, pageNum) => {
  return useQuery(["next-oxygen", id, pageNum], getNextData, {
    select: (data) => {
      const nextPage = data?.data;
      return nextPage;
    },
  });
};
