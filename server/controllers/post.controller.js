import asyncHandler from 'express-async-handler'
import createError from 'http-errors'
import { findUserWithId } from '../services/user.service.js'
import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import { uploadImageToCloudinary } from '../utils/cloudinary.js'

export const addNewPost = asyncHandler(async (req, res, next) => {
  console.log(req.headers['content-type'])
  const user = await findUserWithId(req.user?._id)

  if (!user) return next(createError(404, 'User is not logged in'))
  console.log(req.file)
  const { title, description, tags, image } = req.body
  // const image = req.file
  // const uploadImage = await uploadImageToCloudinary(image)
  // console.log(uploadImage)

  // console.log(postTags)
  const post = await Post.create({
    user: user._id,
    title,
    description,
    tags,
    image
  })

  res.status(201).json(post)
})

export const getPosts = asyncHandler(async (req, res, next) => {
  const query = {}
  const title = req.query.title || ''

  if (title) {
    // Use a case-insensitive regular expression for the title
    query.title = { $regex: new RegExp(title, 'i') }
  }

  console.log(query)
  const posts = await Post.find(query).populate('comments').populate('user')

  if (posts.length === 0) return next(createError(404, 'No post found'))

  res.status(200).json(posts)
})

export const getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('comments')
    .populate('user')

  if (!post) return next(createError(404, 'Post not found!'))
  res.status(200).json(post)
})

export const getUserPosts = asyncHandler(async (req, res, next) => {})

export const likePost = asyncHandler(async (req, res, next) => {
  const user = await findUserWithId(req.user?._id)

  if (!user) return next(createError(404, 'User is not logged in'))

  const { isLike, id } = req.body

  const post = await Post.findById(id)

  if (!post) return next(createError(404, 'Post not found'))

  if (isLike) {
    // Add product to wishlist
    if (!user.likes.includes(id)) {
      user.likes.push(id)
      await user.save()
    }
  } else {
    const index = user.likes.indexOf(id)
    if (index !== -1) {
      user.likes.splice(index, 1)
      await user.save()
    }
  }

  post.isLike = isLike
  await post.save()

  res.status(200).json(post)
})

export const editPost = asyncHandler(async (req, res, next) => {
  const { title, description, tags, image } = req.body

  console.log(req.body)
  const postId = req.params.id
  const post = await Post.findById(postId)
  if (!post) return next(createError(404, 'Post not found'))

  post.title = title
  post.description = description
  post.tags = tags
  post.image = image

  await post.save()
  res.status(200).json(post)
})

export const deletePost = asyncHandler(async (req, res, next) => {
  console.log(req.params.id)
  const post = await Post.findByIdAndRemove({ _id: req.params.id })
  if (!post) return next(createError(404, 'Post not found'))
  await Comment.deleteMany({ post: req.params.id })

  res.status(200).json(post)
})
