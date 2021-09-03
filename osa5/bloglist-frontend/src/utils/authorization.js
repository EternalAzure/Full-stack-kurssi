

const authHeader = () => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    const token = JSON.parse(loggedBlogappUser).token
    return {headers: {'Authorization': `Bearer ${token}`}}
}

const getUser = () => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    return JSON.parse(loggedBlogappUser)
}

const compare = (username) => {
    const user = getUser()
    if (user) return username === user.username
}

const authorization = {
    authHeader,
    getUser,
    compare
}

export default authorization