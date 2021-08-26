const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
});
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)
  if(!user) return response.status(400).json({error: 'User id not provided'})

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  Blog.findByIdAndDelete(request.params.id)
  response.status(204).end
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