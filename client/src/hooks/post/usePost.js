import useSWR from "swr";
import { publicFetcher } from "../../http";

const usePost = (postId) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/post/${postId}`,
    publicFetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
