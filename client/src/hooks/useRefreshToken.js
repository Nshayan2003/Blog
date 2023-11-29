import { axiosPublic } from "../http";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPublic.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        isAuth: true,
        user: response.data.user,
        accessToken: response.data.access_token,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
