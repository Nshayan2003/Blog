import useAxiosPrivate from "./useAxiosPrivate";

const usePrivateFetcher = () => {
  const axiosPrivate = useAxiosPrivate();

  const privateFetcher = (...args) =>
    axiosPrivate.get(...args).then((res) => res.data);

  return privateFetcher;
};

export default usePrivateFetcher;
