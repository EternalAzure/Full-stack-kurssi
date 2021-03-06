import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = contact => {
  const request = axios.post(baseUrl, contact)
  return request.then(response => response.data)
}

const update = (id, contact) => {
  const request = axios.put(`${baseUrl}/${id}`, contact)
  return request.then(response => response.data)
}

const goodRiddance = (id) => {
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  return request.then(response => response.data)
}

export default {getAll, create, update, goodRiddance}