import toast from "react-hot-toast";
import useAuth from "../useAuth";
import useAxiosPrivate from "../useAxiosPrivate";
import useProfile from "../useProfile";
import { AxiosError } from "axios";
import { handleApiError } from "../../utils/handleApiError";
import usePost from "./usePost";

const useDeletePost = (postId) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { mutate } = useProfile();
  const { mutate: postMutate } = usePost(postId);

  const deletPost = async () => {
    if (!auth) {
      toast.error("You are not logged in. Please login");
      return;
    }

    try {
      await axiosPrivate.delete(`/post/${postId}`);

      mutate("/user/profile");
      postMutate(`/post/${postId}`);
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
  return deletPost;
};

export default useDeletePost;
