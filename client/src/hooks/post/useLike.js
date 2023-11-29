import useAuth from "../useAuth";
import toast from "react-hot-toast";
import useAxiosPrivate from "../useAxiosPrivate";
import useProfile from "../useProfile";
import { AxiosError } from "axios";
import { handleApiError } from "../../utils/handleApiError";

const useLike = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { mutate } = useProfile();



  const handleLike = async (isLike, postId) => {
    if (!auth) {
      toast.error("You are not logged in. Please login");
      return;
    }

    try {
      await axiosPrivate.patch("/post/like", {
        id: postId,
        isLike: isLike,
      });
      mutate("/user/profile");
    } catch (error) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    }
  };
  return handleLike;
};

export default useLike;
