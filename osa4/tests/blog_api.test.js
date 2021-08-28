const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./test_helper')
const bcrypt = require('bcrypt')


const initialBlogs = testHelper.initialBlogs

const getToken = async () => {
  const user = (await User.findOne({})).toJSON()
  console.log('user', user)

  const userForToken = {
    username: user.username,
    id: user.id
  }
  return jwt.sign(userForToken, process.env.SECRET, {expiresIn: 10})
}

describe('blog_api', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const hash = bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'Superuser',
      password: hash
    })
    await user.save()

    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })
  
  describe('misc', () => {
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
  })

  describe('adding a blog', () => {
    test('creation succeeds with proper statuscode when all valid', async () => {
      const token = `bearer ${await getToken()}`
      
      const newBlog = {
        title: 'Valid blog',
        author: 'author3',
        url: 'http://www.thirdurl.com',
        likes: 30
      }

      await api
        .post('/api/blogs')
        .set('authorization', token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const title = response.body.map(r => r.title)
      
      expect(response.body).toHaveLength(initialBlogs.length + 1)
      expect(title).toContain('Valid blog')
    })
    
    test('no likes becomes zero likes', async () => {
      const token = `bearer ${await getToken()}`

      const newBlog = {
        title: 'Blog number four',
        author: 'author4',
        url: 'http://www.thirdurl.com'
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const likes = response.body.map(r => r.likes)
    
      expect(response.body).toHaveLength(initialBlogs.length + 1)
      expect(likes[initialBlogs.length]).toBe(0)
    })
    
    test('creation fails with proper statuscode when blog not valid', async () => {
      const token = `bearer ${await getToken()}`

      const newBlog = {
        title: 'this is not valid',
        author: 'missing url'
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(400)
    
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('creation fails with proper statuscode and message if token not provided', async () => {
      const newBlog = {
        title: 'this is not valid',
        author: 'missing url',
        url: 'www.shouldnotpass.de'
      }
    
      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
  
      expect(result.body.error).toContain('invalid token')
  
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length)
    })
  })

  describe('deleting a blog', () => {
  
    test('success when valid token provided', async () => {
      //1. Create a blog
      const validToken1 = `bearer ${await getToken()}`
      const newBlog = {
        title: 'Will be removed',
        author: 'Will Disappear',
        url: 'http://www.mock.com',
        likes: 30
      }
      await api
        .post('/api/blogs')
        .set('Authorization', validToken1)
        .send(newBlog)
        .expect(200)

      const allBlogs = await api.get('/api/blogs')
      const blogId = allBlogs.body[allBlogs.body.length -1].id
      //2. Delete the blog
      await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', validToken1)
        .expect(204)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('failure when valid token not provided', async () => {
      const notValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvb3BlIiwiaWQiOiI2MTI4ZGRhYWIzYTNhMjQwNzRmMjI5MDYiLCJpYXQiOjE2MzAwNzQzMjAsImV4cCI6MTYzMDA3NzkyMH0.I-Wu_95B4W5zW0XgIhJnZKDLsQRf0Zp-ivrfj83uSUg'
      const blogId = initialBlogs[0]._id
    
      await api
        .delete(`/api/blogs/:${blogId}`)
        .set('Authorization', notValidToken)
        .expect(401)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})