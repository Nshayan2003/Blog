import useSWR from "swr";
import usePrivateFetcher from "./usePrivateFetcher";

const useProfile = () => {
  const privateFetcher = usePrivateFetcher();
  const { data, error, isLoading, mutate } = useSWR(
    "/user/profile",
    privateFetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProfile;
