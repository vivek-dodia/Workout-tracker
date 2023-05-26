import axios from "../axios"
import { Exercise } from "../types"

const baseUrl = import.meta.env.VITE_BASE_URL + "exercises"


const getAll = async (): Promise<Exercise[]> => {
  const { data } = await axios.get<Exercise[]>(baseUrl, { timeout: 10000 })
  return data
}

const create = async (
  objectToCreate: Omit<Exercise, "id" | "user">
): Promise<Exercise> => {
  const { data } = await axios.post<Exercise>(baseUrl, objectToCreate, { timeout: 10000 }) 
  return data
}

const update = async (
  id: string,
  objectToUpdate: Exercise
): Promise<Exercise> => {
  const { data } = await axios.put<Exercise>(`${baseUrl}/${id}`, objectToUpdate, { timeout: 10000 })
  return data
}

const remove = async (id: string): Promise<Exercise> => {
  const { data } = await axios.delete<Exercise>(`${baseUrl}/${id}`, { timeout: 10000 })
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

const initSystem = async () => {
  const { data } = await axios.post(`${baseUrl}/init/system`)
  console.log("response.data", data)
}

const removeAllSystem = async () => {
  await axios.delete(`${baseUrl}/all`)
  console.log('"DB CLEARED"', "DB CLEARED")
}

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
  init,
  initSystem,
  removeAllSystem,
}
