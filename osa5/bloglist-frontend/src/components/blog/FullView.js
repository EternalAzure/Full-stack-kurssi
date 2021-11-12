import React from 'react'
import authorization from '../../utils/authorization'

/*
This is a full view of an individual blog
*/
const FullView = ({blog, handler, removeHandler, likeHandler, messageHandler}) => {

  const handler1 = () => {
    likeHandler(blog, messageHandler)
  }
  const handler2 = () => {
    removeHandler(blog, messageHandler)
  }

  return (
    <div className='blog'>
      {<b>{blog.title}</b>} <button onClick={handler}>hide</button> <br></br>
      by {blog.author} <br></br>
      {blog.url} <br></br>
      likes: {blog.likes}
      <LikeButton 
        handler={handler1}
      /> <br></br>
      {blog.user.name} <br></br>
      {authorization.compare(blog.user.username) &&
      <RemoveButton
        handler={handler2}
      />}
    </div>
  )
}


const LikeButton = ({handler}) => {
  return (
    <button className='likeButton' onClick={handler} >like</button>
  )
}

const RemoveButton = ({handler}) => {
  return (
    <button className='remove-button' onClick={handler} >remove</button>
  )
}

export default FullView