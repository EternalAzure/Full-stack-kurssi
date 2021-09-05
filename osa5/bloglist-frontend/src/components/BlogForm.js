import React, {useState} from 'react'
import blogService from '../services/blogs'

/*
Lets logged in users create a new blog post. Shown only to logged in users
*/
const BlogForm = ({setIsError, setUserMessage, refresh}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService.create(newBlog)
      .then(response => {
        setIsError(false)
        setUserMessage(`'${response.title}' by ${response.author} added`)
        refresh()
      })
      .catch(error => {
        setIsError(true)
        if (error.response.status === 400) {
          setUserMessage('400 (Bad request) Title and url required')
        } else if (error.response.status === 401) {
          setUserMessage('401 (Unathorized) Login again')
        } else {
          setUserMessage(`error:${error.response.status}`)
        }
      })
    setTimeout(() => {
      setUserMessage(null)
    }, 5000)
  }

  return (
    <div>

      <div>
        <form onSubmit={addBlog}>
          <div>
            Title
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            URL
            <input
              type="text"
              value={url}
              name="url"
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm