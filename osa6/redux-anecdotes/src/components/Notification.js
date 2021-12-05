import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const showNotification = useSelector(state => state.show)
  if (showNotification === false) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification