import axios from 'axios'
import authorization from '../utils/authorization'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, authorization.authHeader())
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, authorization.authHeader())
  return request.then(response => response.data)
}

const blogServices = {
  getAll, create, update, remove
}

export default blogServices