import React, {useState} from 'react'

/*
Lets logged in users create a new blog post. Shown only to logged in users
*/
const BlogForm = ({messageHandler, createHandler}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const addBlog = (event) => {
    event.preventDefault()
    createHandler(title, author, url, messageHandler)
  }

  return (
    <div>

      <div>
        <form onSubmit={addBlog}>
          <div>
            Title
            <input className='titleInput'
              type="text"
              value={title}
              name="Title"
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            Author
            <input className='authorInput'
              type="text"
              value={author}
              name="Author"
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            URL
            <input className='urlInput'
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