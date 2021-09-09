import React, {useState} from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import authorization from '../utils/authorization'

/*
Lets users to login. Hiden from logged in users
*/
/* eslint-disable-next-line */
const LoginForm = React.forwardRef(({messageHandler}, ref) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      authorization.setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      messageHandler('Wrong username or password', true)
    }
  }

  if (!authorization.getUser()) {
    return (
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  return (
    <div>
      <p>{authorization.getUser().name} logged in <button onClick={handleLogout} > logout </button> </p>
    </div>
  )
})

LoginForm.propTypes = {
  messageHandler: PropTypes.func.isRequired
}

LoginForm.displayName = 'LoginForm'

export default LoginForm