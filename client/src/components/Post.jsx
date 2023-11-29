import { Link, useNavigate } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useCallback, useState } from "react";
import useToggle from "../hooks/useToggle";
import Comment from "./Comment";
import useLike from "../hooks/post/useLike";
import useAddComment from "../hooks/comments/useAddComment";
import useComment from "../hooks/comments/useComment";
import useDeletePost from "../hooks/post/useDeletePost";
import useProfile from "../hooks/useProfile";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const { data: user } = useProfile();
  const { data: comments } = useComment(post?._id);
  const [isLike, setIslIke] = useState(post?.isLike);
  const commentToggle = useToggle();
  const handlePostLike = useLike();
  const addComment = useAddComment();
  const deletePost = useDeletePost(post?._id);
  const [commentText, setCommentText] = useState("");

  const handleLike = useCallback(async () => {
    setIslIke((prev) => !prev);
    const like = !isLike;
    await handlePostLike(like, post?._id);
  }, [handlePostLike, isLike, post?._id]);

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    await addComment(post?._id, commentText);
    setCommentText("");
  };

  const handletDeletePost = async () => {
    await deletePost();
  };

  const hasUser = post?.user?._id === user?._id;

  return (
    <div className="w-full h-auto shadow-md bg-white rounded-lg pb-2">
      <Link className="w-full " to={`/post/${post?._id}`}>
        <img
          src={post?.image}
          alt="post-image"
          className="rounded-t-lg cursor-pointer object-cover w-full"
        />
      </Link>
      <div className="p-2">
        <h2 className="text-2xl font-medium break-words">{post?.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: post?.description }}
          className="text-sm tracking-wide text-gray-700 my-2"
        ></div>
      </div>

      <div className="mb-4 flex items-center justify-between w-full px-4">
        <div className="flex items-center flex-wrap gap-3">
          {post?.tags?.map((val, idx) => (
            <div
              key={idx}
              className="border border-gray-300 h-10 px-3 text-sm flex items-center justify-center rounded-3xl"
            >
              {val}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 ">
          <button type="button" onClick={handleLike}>
            {isLike ? (
              <AiFillLike size={24} color="blue" />
            ) : (
              <AiOutlineLike size={24} color="#222" />
            )}
          </button>
          <button type="button" onClick={commentToggle.onToggle}>
            <FaRegCommentDots size={22} color="green" />
          </button>
          {hasUser && (
            <>
              <button
                type="button"
                onClick={() => navigate(`/edit-post/${post?._id}`)}
              >
                <FaRegEdit size={22} color="blue" />
              </button>
              <button onClick={handletDeletePost} type="button">
                <MdDelete size={22} color="red" />
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        {commentToggle.toggle && (
          <div className="px-4 mt-6">
            <form
              onSubmit={handleSubmitComment}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder="Write your comment"
                className="border border-gray-300 w-full h-10 rounded-lg px-2 text-sm focus:outline-blue-300 focus:outline-1 outline-0"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 h-9 rounded cursor-pointer hover:bg-blue-700 transition duration-300"
              >
                Add
              </button>
            </form>
            <div className="mt-4 flex flex-col gap-4 h-[200px] overflow-y-auto scrollbar">
              {comments?.map((comment) => {
                return <Comment key={comment?._id} comment={comment} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
