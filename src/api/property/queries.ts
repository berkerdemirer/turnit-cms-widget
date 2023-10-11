import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api";

export const useFetchRandomNumber = () => {
  const fetchNumber = async () => {
    return (
      await apiClient.get(
        "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new",
      )
    ).data;
  };

  return useQuery(["random"], fetchNumber);
};
