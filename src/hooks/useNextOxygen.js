import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getNextData = async ({ queryKey }) => {
  const id = queryKey[1];
  const pageNum = queryKey[2];
  return await axios.get(
    `https://api.odn-it.com/devices/${id}/oxygens/?size=3&page=${pageNum}`
  );
};

export const useNextOxygen = (id, pageNum) => {
  return useQuery(["next-oxygen", id, pageNum], getNextData, {
    select: (data) => {
      const nextPage = data?.data;
      return nextPage;
    },
  });
};
