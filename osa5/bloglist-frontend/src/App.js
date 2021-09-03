import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notifications from './components/Notifications'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/blog/Blog'

const App = () => {
  const [user, setUser] = useState(null)
  const [userMessage, setUserMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [isError, setIsError] = useState(true)
  
  const refresh = () => {
    function compareLikes( a, b ) {
      if ( a.likes > b.likes ){
        return -1;
      } else if ( a.likes < b.likes ){
        return 1;
      }
      return 0;
    }
    blogService
      .getAll()
      .then(blogs => blogs.sort(compareLikes))
      .then(sortedBlogs => setBlogs(sortedBlogs)
    ) 
  }

  useEffect(() => {
    refresh() 
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notifications message={userMessage} isError={isError} />
      <LoginForm 
          loggedInUser={user} 
          setUser={setUser} 
          setUserMessage={setUserMessage} 
          setIsError={setIsError} 
      />

      {user && 
      <Togglable buttonLabel='create new blog'>
      <BlogForm 
        setIsError={setIsError} 
        setUserMessage={setUserMessage} 
        user={user} 
        refresh={refresh}/>
      </Togglable>}

      <h2>Blogs</h2>
      <div>
        {blogs.map(blog => 
        <Blog 
          key={blog.id} 
          blog={blog}
          setIsError={setIsError}
          setUserMessage={setUserMessage}
          refresh={refresh} 
        />
      )}
      </div>
      
    </div>
  )
}

export default App