import React, {useState, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

//Toggles between preview and full view of an blog

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = {display: visible ? 'none' : '', marginBottom: 5}
  const showWhenVisible = {
    display: visible ? '' : 'none',
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <div className='blog'>
          {<b>{props.blog.title}</b>} <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )
})

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

Toggle.displayName = 'Toggle'

export default Toggle