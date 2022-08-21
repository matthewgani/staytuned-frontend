import axios from 'axios'
const baseUrl = '/api/users'

export const createAccount = async (newObject) => {
  console.log(newObject)
  const response = await axios.post(baseUrl, newObject)
  console.log(response)
  return response.data

}

const userService = {
  createAccount
};

export default userService