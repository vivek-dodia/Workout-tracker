import axios from "axios"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import { RootState } from "./store"

let store: ToolkitStore

export const injectStore = (_store: ToolkitStore): void => {
  store = _store
}

axios.interceptors.request.use(
  async function (config) {
    const state: RootState = store.getState()
    const user = state.user
    config.headers.Authorization = `bearer ${user?.token}`
    return config
  },
  async function (error) {
    return Promise.reject(error)
  }
)

export default axios
