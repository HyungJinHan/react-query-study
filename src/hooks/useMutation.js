import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addHerosData = async (hero) => {
  return await axios.post("http://localhost:5000/superheros", hero);
};

const deleteHerosData = async (id) => {
  return await axios.delete(`http://localhost:5000/superheros/${id}`);
};

export const useAddHero = () => {
  const queryClient = useQueryClient();

  return useMutation(addHerosData, {
    onSuccess: () => {
      queryClient.invalidateQueries("heors");
      // post, delete 시, 실시간으로 최신화 시켜주는 작업
      // 키가 여러 개라면, ["heros", "detail", ...]
    },
  });
};

export const useDeleteHero = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteHerosData, {
    onSuccess: () => {
      queryClient.invalidateQueries("heors");
      // post, delete 시, 실시간으로 최신화 시켜주는 작업
      // 키가 여러 개라면, ["heros", "detail", ...]
    },
  });
};
