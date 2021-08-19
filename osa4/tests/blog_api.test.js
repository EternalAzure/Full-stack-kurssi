const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Blog number one',
    author: 'author1',
    url: 'http://www.firsturl.com',
    likes: 10
  },
  {
    title: 'Blog number two',
    author: 'author2',
    url: 'http://www.secondurl.com',
    likes: 20
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('id field is defined', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => 
    expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog number three',
    author: 'author3',
    url: 'http://www.thirdurl.com',
    likes: 30
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const title = response.body.map(r => r.title)
  console.log('TITLE PRINTED:', title)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(title).toContain(
    'Blog number three'
  )
})

test('no likes becomes zero likes', async () => {
  const newBlog = {
    title: 'Blog number four',
    author: 'author4',
    url: 'http://www.thirdurl.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(likes[2]).toBe(0)
})

test('non valid blog is not added', async () => {
  const newBlog = {
    author: 'author'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})


afterAll(() => {
  mongoose.connection.close()
})