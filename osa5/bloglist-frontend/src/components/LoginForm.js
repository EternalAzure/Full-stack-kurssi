import React from 'react'

const LoginForm = (props) => {
    const action = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        props.setUser(null)
    }

  if (!props.user) {
    return (
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }
  
  return (
    <div>
      <p>{props.user.name} logged in <button onClick={action} > logout </button> </p>
    </div>
  )
}

export default LoginForm