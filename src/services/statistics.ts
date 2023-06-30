import axios from "../axios"
import { Statistics } from "../types"

const baseUrl = import.meta.env.VITE_BASE_URL + "statistics"

const getAll = async (): Promise<Statistics> => {
  const { data } = await axios.get<Statistics>(baseUrl)
  return data
}

export default {
  getAll,
}
