import { Schema, model } from 'mongoose'

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    tags: [String],

    image: {
      type: String
    },
    isLike: {
      type: Boolean,
      default: false
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      transform (doc, ret) {
        delete ret.__v
      }
    },
    timestamps: true
  }
)

const Post = model('Post', postSchema)

export default Post
