import { useParams } from "react-router-dom";
import usePost from "../hooks/post/usePost";
import { Post } from "../components";

const PostDetail = () => {
  const { id } = useParams();
  const { data: post } = usePost(id);


  return <div className="max-w-5xl w-full mx-auto my-12">
    <Post post={post} />
  </div>;
};

export default PostDetail;
