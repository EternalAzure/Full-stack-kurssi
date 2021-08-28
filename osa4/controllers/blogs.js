const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: body.userId
  })
  
  const savedBlog = await blog.save()
  
  const user = await User.findById(body.userId)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id

  const toBeDeleted = await Blog.findById(id)
  if (!toBeDeleted) {return response.status(404).json({error: `blog not found with id ${id}`})}

  if (request.user.id === toBeDeleted.user.toString()) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else {
    response.status(401).json({error: 'invalid token'})
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, newBlog, {new:true})
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter