import axios from "axios"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import { RootState } from "./store"
import { clearMessage, setMessage } from "./reducers/notificationReducer"
import { NotificationType } from "./types"

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

axios.interceptors.response.use(
  async function (response) {
    return response
  },
  async function (error) {
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      console.log("Request timed out")
      // store.dispatch(
      //   setMessage({
      //     message: "Request timed out",
      //     type: NotificationType.alert,
      //   })
      // )
      // setTimeout(() => {
      //   store.dispatch(clearMessage())
      // }, 5000)
    }
    return Promise.reject(error)
  }
)

export default axios
