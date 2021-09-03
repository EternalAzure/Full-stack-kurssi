import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({setUser, setUserMessage, setIsError, loggedInUser}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username, password,
          })
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          )
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
          setUserMessage('Wrong username or password')
          setIsError(true)
          setTimeout(() => {
            setUserMessage(null)
          }, 5000)
        }
      }

  if (!loggedInUser) {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }
  
  return (
    <div>
      <p>{loggedInUser.name} logged in <button onClick={handleLogout} > logout </button> </p>
    </div>
  )
}

export default LoginForm