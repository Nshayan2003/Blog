import useSWR from "swr";
import { publicFetcher } from "../../http";

const usePosts = (title = "") => {
  const { data, error, isLoading, mutate } = useSWR(
    `/post?title=${title}`,
    publicFetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
