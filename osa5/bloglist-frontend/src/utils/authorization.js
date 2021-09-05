
const authHeader = () => {
  const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
  const token = JSON.parse(loggedBlogappUser).token
  return {headers: {'Authorization': `Bearer ${token}`}}
}

const getUser = () => {
  const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
  return JSON.parse(loggedBlogappUser)
}

const setUser = user => {
  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(user)
  )
}

const isUser = () => {
  if (getUser()) return true
  return false
}

const compare = (username) => {
  const user = getUser()
  if (user) return username === user.username
}

const authorization = {
  authHeader,
  getUser,
  setUser,
  isUser,
  compare
}

export default authorization