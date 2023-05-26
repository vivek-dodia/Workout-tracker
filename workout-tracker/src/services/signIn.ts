import axios from "axios"
import { Credentials, User } from "../types"

const baseUrl = import.meta.env.VITE_BASE_URL + "login"

const signIn = async (credentials: Credentials): Promise<User> => {
  const { data } = await axios.post<User>(baseUrl, credentials, { timeout: 10000 })
  return data
}

export default { signIn }
