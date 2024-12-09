const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  
  response.json(blogs)
  })

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'User not authenticated' })
  }
  
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { id } = request.params

  const blog = await Blog.findById(id)

  if (!request.user) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  if ( blog.user.toString() !== request.user.id.toString()) {
    return response.status(403).json({ error: 'Forbidden: You do not have permission to delete this blog' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
  })

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body

const updatedBlog = await Blog.findByIdAndUpdate(
  id,
  { likes },
  { new: true }
)

response.json(updatedBlog)
})

module.exports = blogsRouter