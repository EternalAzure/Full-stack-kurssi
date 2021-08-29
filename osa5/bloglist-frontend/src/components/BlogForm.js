import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setIsError, setUserMessage}) => {
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
            console.log('response', response)
            setIsError(false)
            setUserMessage(`'${response.title}' by ${response.author} added`)
        })
        .catch(error => {
            setIsError(true)
            if (error.response.status === 400) {
                setUserMessage(`400 Bad request. Title and url required`)
            } else {
                setUserMessage(`error:${error.response.status}`)
            }
        })
        
    }

    return (
        <form onSubmit={addBlog}>
        <div>
          Title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
            <input
            type="text"
            value={url}
            name="Author"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    )
}

export default BlogForm