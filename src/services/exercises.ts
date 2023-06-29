import axios from "../axios"
import { Exercise } from "../types"

const baseUrl = import.meta.env.VITE_BASE_URL + "exercises"

const getAll = async (): Promise<Exercise[]> => {
  const { data } = await axios.get<Exercise[]>(baseUrl)
  return data
}

const create = async (
  objectToCreate: Omit<Exercise, "id" | "user">
): Promise<Exercise> => {
  const { data } = await axios.post<Exercise>(baseUrl, objectToCreate)
  return data
}

const update = async (
  id: string,
  objectToUpdate: Exercise
): Promise<Exercise> => {
  const { data } = await axios.put<Exercise>(`${baseUrl}/${id}`, objectToUpdate)
  return data
}

const remove = async (id: string): Promise<Exercise> => {
  const { data } = await axios.delete<Exercise>(`${baseUrl}/${id}`)
  return data
}

export default {
  getAll,
  create,
  update,
  remove,
}
