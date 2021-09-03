import React from 'react'
import blogServices from '../../services/blogs'
import authorization from '../../utils/authorization'

/*
This is full view of individual blog 
*/
const BlogFull = ({blog, handler, setUserMessage, setIsError, refresh}) => {
  
  return (
    <div className='blog'>
    {<b>{blog.title}</b>} <button onClick={handler}>hide</button> <br></br>
    by {blog.author} <br></br>
    {blog.url} <br></br>
    likes: {blog.likes} 
    <LikeButton 
      blog={blog} 
      setIsError={setIsError} 
      setUserMessage={setUserMessage} 
      refresh={refresh} 
    /> <br></br>
    {blog.user.name} <br></br>
    {authorization.compare(blog.user.username) && 
    <RemoveButton 
    setIsError={setIsError} 
    setUserMessage={setUserMessage} 
    blog={blog} 
    refresh={refresh} 
    />}
  </div> 
  )
}

const LikeButton = ({blog, setIsError, setUserMessage, refresh}) => {
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes +1,
    user: blog.user
  }
  const handler = () => {
    console.log('newBlog', newBlog)
    console.log('blog.id', blog.id)
    blogServices
      .update(blog.id, newBlog)
      .then(() => {
        setIsError(false)
        setUserMessage(`Liked ${blog.title} by ${blog.author}`)
      })
      .catch(error => {
        setIsError(true)
        setUserMessage(`error: ${error.response.status}`)
      })
      refresh()
      setTimeout(() => {
        setUserMessage(null)
    }, 5000)
  }

  return (
    <button onClick={handler} >like</button>
  )
}

const RemoveButton = ({blog, setIsError, setUserMessage, refresh}) => {
  const handler = () => {
    const message = `Removing ${blog.title}. Continue?`
    if (!window.confirm(message)) return

    blogServices
      .remove(blog.id)
      .then(() => {
        setIsError(false)
        setUserMessage(`Removed ${blog.title} by ${blog.author}`)
      })
      .catch(error => {
        setIsError(true)
        setUserMessage(`error: ${error.response.status}`)
      })
      refresh()
      setTimeout(() => {
        setUserMessage(null)
    }, 5000)
  }
  return (
    <button className='slategrey-button' onClick={handler} >remove</button>
  )
}

export default BlogFull