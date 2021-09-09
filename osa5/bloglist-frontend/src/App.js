import React, {useState, useEffect} from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notifications from './components/Notifications'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/blog/Blog'
import auth from './utils/authorization'
import buttonHandlers from './handlers/buttons'

const App = () => {
  const [isError, setIsError] = useState(true)
  const [userMessage, setUserMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  const refresh = () => {
    function compareLikes( a, b ) {
      if ( a.likes > b.likes ){
        return -1
      } else if ( a.likes < b.likes ){
        return 1
      }
      return 0
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

  const messageHandler = (message, bool) => {
    setUserMessage(message)
    setIsError(bool)
    setTimeout(() => {
      setUserMessage(null)
    }, 5000)
    refresh()
  }

  return (
    <div>
      <Notifications message={userMessage} isError={isError} />
      <LoginForm messageHandler={messageHandler} />

      {auth.isUser() &&
      <Togglable buttonLabel='create new blog'>
        <BlogForm 
          messageHandler={messageHandler} 
          createHandler={buttonHandlers.createButton} 
        />
      </Togglable>}

      <h2>Blogs</h2>
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={buttonHandlers.likeButton}
            removeHandler={buttonHandlers.removeButton}
            messageHandler={messageHandler}
          />
        )}
      </div>
    </div>
  )
}

export default App