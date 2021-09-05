import React, {useRef} from 'react'
import Toggle from './Toggle'
import FullView from './FullView'

/*
This combines Toggle and FullView. Together they make a Blog that
can be viewed or hidden by user. A Blog displays information from database
*/
const Blog = ({blog, setUserMessage, setIsError, refresh}) => {
  const expandableRef = useRef()
  const hideButtonHandler = () => expandableRef.current.toggleVisibility()

  return (
    <div>
      <Toggle buttonLabel='view' ref={expandableRef} blog={blog} >
        <FullView
          key={blog.id}
          blog={blog}
          handler={hideButtonHandler}
          setUserMessage={setUserMessage}
          setIsError={setIsError}
          refresh={refresh}
        />
      </Toggle>
    </div>
  )
}
export default Blog