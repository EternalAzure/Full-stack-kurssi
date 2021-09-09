import React, {useRef} from 'react'
import Toggle from './Toggle'
import FullView from './FullView'

/*
Purpose: To make App.js prettier and easier to read
How: Hides useRef() and nested Toggle/FullView -structure
This combines Toggle and FullView. Together they make a Blog that
can be viewed or hidden by a user.
*/
const Blog = ({blog, likeHandler, removeHandler, messageHandler}) => {
  const toggleRef = useRef()

  const hideButtonHandler = () => toggleRef.current.toggleVisibility()

  return (
    <div>
      <Toggle buttonLabel='view' ref={toggleRef} blog={blog} >
        <FullView
          key={blog.id}
          blog={blog}
          handler={hideButtonHandler}
          likeHandler={likeHandler}
          removeHandler={removeHandler}
          messageHandler={messageHandler}
        />
      </Toggle>
    </div>
  )
}
export default Blog