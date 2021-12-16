import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

// Add id number to baseUrl
const vote = async (anecdote, id) => {
  anecdote.votes += 1
  const response = await axios.put(`${baseUrl}/${id}`, anecdote)
  console.log('vote response.data', response.data)
  return response.data
}

const anecdoteService = { getAll, createNew, vote }
export default anecdoteService