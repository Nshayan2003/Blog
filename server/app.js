import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import createHttpError from 'http-errors'
import { connectDB } from './utils/connectDB.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// Database connection
;(async () => await connectDB())()

// App middlewares
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      '*',
      'https://blog-website-otherwise.netlify.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
)
app.use('/', express.static(path.join(__dirname, 'uploads')))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: 'Server is on running....'
  })
})

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

app.use('*', async (req, res, next) => {
  next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message
  })
})

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
