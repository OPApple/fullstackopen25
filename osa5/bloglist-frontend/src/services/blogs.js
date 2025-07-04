import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async updatedBlog => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

const deleteBlog = async badBlog => {
  const config = {
    headers: {Authorization: token },
  }
  
  const response = await axios.delete(`${baseUrl}/${badBlog.id}`, config)
  return response.data
}

export default { getAll, setToken, create, like, deleteBlog }