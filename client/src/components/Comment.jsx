import moment from "moment";

const Comment = ({ comment }) => {
  return (
    <div className="border p-2 rounded-md mr-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={
              comment?.user?.avatar
                ? comment?.user?.avatar?.url
                : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
            }
            alt="profile-image"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{comment?.user?.name}</span>
        </div>

        <p className="text-sm font-medium opacity-70">
          {moment(comment?.createdAt).format("DD MMM, YYYY")}
        </p>
      </div>

      <div className="text-[12px] text-gray-900 tracking-wide my-2">
        {comment?.commentText}
      </div>
    </div>
  );
};

export default Comment;
