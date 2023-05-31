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

export const useAddHero = (pageNum) => {
  const queryClient = useQueryClient();

  return useMutation(addHeroData, {
    onMutate: async (newData) => {
      // Optimistic Update(낙관적 업데이트)를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제
      await queryClient.cancelQueries(["heroes", pageNum]);

      // 이전 값
      const prevData = queryClient.getQueryData(["heroes", pageNum]);

      // 새로운 값으로 Optimistic Update(낙관적 업데이트) 진행
      queryClient.setQueryData(["heroes", pageNum], (oldData) => {
        return {
          ...oldData,
          data: [
            ...oldData.data,
            { id: oldData?.data?.length + 1, ...newData },
          ],
        };
      });

      console.log({ prevData: { prevData } });

      return {
        // 값이 들어있는 context 객체를 반환
        prevData,
      };
    },

    // mutation 실패 시, onMutate에서 반환된 context를 사용하여 롤백 진행
    onError: (_error, _data, context) => {
      console.log({ prevData: context.prevData });
      queryClient.setQueryData(["heroes", pageNum], context.prevData);
    },

    // 오류 또는 성공 후, 항상 데이터 리프레쉬 진행
    onSettled: () => {
      console.log({ onSettled: "Refresh" });
      queryClient.invalidateQueries(["heroes", pageNum]);
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
