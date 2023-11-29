import { AxiosError } from "axios";
import { handleApiError } from "../../utils/handleApiError";
import useAuth from "../useAuth";
import useAxiosPrivate from "../useAxiosPrivate";
import useProfile from "../useProfile";
import toast from "react-hot-toast";

const useAddComment = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { mutate } = useProfile();

  const addComment = async (postId, commentText) => {
    if (!auth) {
      toast.error("You are not logged in. Please login");
      return;
    }

    try {
      await axiosPrivate.post("/comment", {
        postId,
        commentText,
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
  return addComment;
};

export default useAddComment;
