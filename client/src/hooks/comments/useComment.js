import useSWR from "swr";
import { publicFetcher } from "../../http";

const useComment = (postId) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/comment/${postId}`,
    publicFetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useComment;
