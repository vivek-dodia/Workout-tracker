import axios from "../axios"
import { User } from "../types"

const baseUrl = import.meta.env.VITE_BASE_URL + "users"

const create = async (
  objectToCreate: User
): Promise<User> => {
  const { data } = await axios.post<User>(baseUrl, objectToCreate)
  return data
}

const update = async (
  id: string,
  objectToUpdate: User
): Promise<User> => {
  const { data } = await axios.put<User>(`${baseUrl}/${id}`, objectToUpdate)
  return data
}

const remove = async (id: string): Promise<User> => {
  const { data } = await axios.delete<User>(`${baseUrl}/${id}`)
  return data
}

export default { create, update, remove,  }
