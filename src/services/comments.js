import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async newObject => {
  const response = await axios.put(baseUrl + `/${newObject.id}`, newObject)
  return response.data
}

const deleteComment = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + `/${id}`, config)
  return response.data
}

const commentService = {
  getAll,
  create,
  setToken,
  updateLikes,
  deleteComment
};


export default commentService