import blogServices from '../services/blogs'

const likeButton = (blog, messageHandler) => {
  const fieldToUpdate = {
    likes: blog.likes +1
  }

  blogServices
    .update(blog.id, fieldToUpdate)
    .then(() => {
      messageHandler(`Liked ${blog.title} by ${blog.author}`, false)
    })
    .catch((error) => {
      messageHandler(`error: ${error.response.status}`, true)
      console.log('error', error.message)
    })
}

const removeButton = (blog, messageHandler) => {
  const message = `Removing ${blog.title}. Continue?`
  if (!window.confirm(message)) return

  blogServices
    .remove(blog.id)
    .then(() => {
      messageHandler(`Removed ${blog.title} by ${blog.author}`, false)
    })
    .catch(error => {
      if (error.response.status === 400) {
        messageHandler('400 (Bad request) Something went wrong', true)
      } else if (error.response.status === 401) {
        messageHandler('401 (Unathorized) Login again', true)
      } else {
        messageHandler(`error:${error.response.status}`, true)
      }
    })
}

const createButton = (title, author, url, messageHandler) => {
  const newBlog = {
    title: title,
    author: author,
    url: url
  }
  blogServices.create(newBlog)
    .then(response => {
      const message = `${response.title} by ${response.author} added`
      messageHandler(message, false)
    })
    .catch(error => {
      if (error.response.status === 400) {
        messageHandler('400 (Bad request) Title and url required', true)
      } else if (error.response.status === 401) {
        messageHandler('401 (Unathorized) Login again', true)
      } else {
        messageHandler(`error:${error.response.status}`, true)
      }
    })
}

const buttonHandlers = {
  likeButton,
  removeButton,
  createButton
}

export default buttonHandlers