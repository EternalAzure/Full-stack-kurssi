import React, {useState} from 'react'
import PropTypes from 'prop-types'

/*
Will display and or hide props.children by click of an button
*/
const Togglable = React.forwardRef(
  /* eslint-disable-next-line */
  (props, ref) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
)

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable