const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('./test_helper')

const initialBlogs = testHelper.initialBlogs
describe('blog_api', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)

    await User.deleteOne({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      username: 'root',  
      passwordHash: passwordHash 
    })

    await user.save()
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
      const user = await testHelper.usersInDb()
      const id = user.map(u => u.id)
      
      const newBlog = {
        title: 'Valid blog',
        author: 'author3',
        url: 'http://www.thirdurl.com',
        likes: 30,
        userId: id
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
      expect(title).toContain('Valid blog')
    })
    
    test('no likes becomes zero likes', async () => {
      const user = await testHelper.usersInDb()
      const id = user.map(u => u.id)
  
      const newBlog = {
        title: 'Blog number four',
        author: 'author4',
        url: 'http://www.thirdurl.com',
        userId: id
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const likes = response.body.map(r => r.likes)
    
      expect(response.body).toHaveLength(initialBlogs.length + 1)
      expect(likes[initialBlogs.length]).toBe(0)
    })
    
    test('creation fails with proper statuscode when blog not valid', async () => {
      const user = await testHelper.usersInDb()
      const id = user.map(u => u.id)
      const newBlog = {
        title: 'this is not valid',
        author: 'missing url',
        userId: id
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('creation fails with proper statuscode and message if no userId provided', async () => {
      const newBlog = {
        title: 'this is not valid',
        author: 'missing url',
        url: 'www.shouldnotpass.de'
      }
    
      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
      expect(result.body.error).toContain('User id not provided')
  
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length)
    })
  })
  afterAll(() => {
    mongoose.connection.close()
  })
})