import axios from "../axios"
import { Workout } from "../types"

const baseUrl = import.meta.env.VITE_BASE_URL + "workouts"

const getAll = async (): Promise<Workout[]> => {
  const { data } = await axios.get<Workout[]>(baseUrl)
  return data
}

const create = async (
  objectToCreate: Omit<Workout, "id" | "user">
): Promise<Workout> => {
  const { data } = await axios.post<Workout>(baseUrl, objectToCreate)
  return data
}

const update = async (
  id: string,
  objectToUpdate: Workout
): Promise<Workout> => {
  const { data } = await axios.put<Workout>(`${baseUrl}/${id}`, objectToUpdate)
  return data
}

const remove = async (id: string): Promise<Workout> => {
  const { data } = await axios.delete<Workout>(`${baseUrl}/${id}`)
  return data
}

// ADMIN

const init = async () => {
  const { data } = await axios.post(`${baseUrl}/init`)
  console.log("response.data", data)
}

const removeAll = async () => {
  await axios.delete(`${baseUrl}`)
  console.log('"DB CLEARED"', "DB CLEARED")
}

export default { getAll, create, update, remove, removeAll, init }
