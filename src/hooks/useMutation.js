import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addHeroData = async (hero) => {
  return await axios.post("http://localhost:5000/superheroes", hero);
};

const updateHeroData = async (id, hero) => {
  return await axios.put(`http://localhost:5000/superheroes/${id}`, hero);
};

const deleteHeroData = async (id) => {
  return await axios.delete(`http://localhost:5000/superheroes/${id}`);
};

export const useAddHero = () => {
  const queryClient = useQueryClient();

  return useMutation(addHeroData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("heroes");
      // queryClient.setQueryData(["heroes"], (oldData) => {
      //   return {
      //     ...oldData,
      //     data: [...oldData.data, data.data],
      //   };
      // });
    },
  });
};

export const useUpdateHero = (id, hero) => {
  const queryClient = useQueryClient();

  return useMutation(() => updateHeroData(id, hero), {
    onSuccess: () => {
      console.log({ updateValue: { id: id, hero: hero } });
      queryClient.invalidateQueries("heroes");
      // post, delete 시, 실시간으로 최신화 시켜주는 작업
      // 키가 여러 개라면, ["heroes", "detail", ...]
    },
  });
};

export const useDeleteHero = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteHeroData, {
    onSuccess: () => {
      queryClient.invalidateQueries("heroes");
      // post, delete 시, 실시간으로 최신화 시켜주는 작업
      // 키가 여러 개라면, ["heroes", "detail", ...]
    },
  });
};
