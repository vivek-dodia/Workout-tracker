import axios from "../axios"
import { NewCredentials, User } from "../types"

const baseUrl = import.meta.env.VITE_BASE_URL + "users"

const create = async (objectToCreate: NewCredentials): Promise<User> => {
  const { data } = await axios.post<User>(baseUrl, objectToCreate)
  return data
}

const update = async (id: string, objectToUpdate: User): Promise<User> => {
  const { data } = await axios.put<User>(`${baseUrl}/${id}`, objectToUpdate)
  return data
}

const updatePassword = async (
  id: string,
  objectToUpdate: { password: string }
): Promise<User> => {
  const { data } = await axios.put<User>(
    `${baseUrl}/${id}/password`,
    objectToUpdate
  )
  return data
}

const checkExistingUsername = async (username: string): Promise<string> => {
  const { data } = await axios.get<string>(`${baseUrl}/username/${username}`)
  return data
}

const checkExistingEmail = async (email: string): Promise<string> => {
  const { data } = await axios.get<string>(`${baseUrl}/email/${email}`)
  return data
}

const remove = async (id: string): Promise<User> => {
  const { data } = await axios.delete<User>(`${baseUrl}/${id}`)
  return data
}

export default { create, update, remove, checkExistingUsername, checkExistingEmail, updatePassword }
