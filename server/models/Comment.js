import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },

    commentText: {
      type: String,
      required: true,
      trim: true,
    },

    replies: [
      {
        commentId: {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
        user: Object,
        reply: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

export default Comment;
