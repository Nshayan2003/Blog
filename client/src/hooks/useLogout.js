import { handleApiError } from "../utils/handleApiError";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const useLogout = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      await axiosPrivate.post("/auth/logout");
    } catch (error) {
      console.error(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    }
  };

  return logout;
};

export default useLogout;
