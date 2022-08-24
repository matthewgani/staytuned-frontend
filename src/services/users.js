import axios from 'axios'
const baseUrl = '/api/users'

export const createAccount = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data

}

const updateRefreshToken = async (user_id, refresh_token) => {
  const response = await axios.put(baseUrl + `/${user_id}`, refresh_token)
  return response.data
}

const userService = {
  createAccount,
  updateRefreshToken
};

export default userService