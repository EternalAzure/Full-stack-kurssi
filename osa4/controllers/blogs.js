const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (response) => {
  Blog
    .find({})
    .then(blogs => {
      console.log('blogs', blogs)
      console.log('blogs JSON', JSON.stringify(blogs))
      response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter