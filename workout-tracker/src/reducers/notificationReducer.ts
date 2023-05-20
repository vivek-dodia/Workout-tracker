import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { Notification } from "../types"

const initialState = {
  message: "",
  type: "",
} as Notification

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, { payload }: PayloadAction<Notification>): void {
      const { message, type } = payload
      state.message = message
      state.type = type
    },
    clearMessage(state): void {
      state.message = ""
      state.type = ""
    },
  },
})

const { setMessage, clearMessage } = notificationSlice.actions

let timeoutID: number | undefined = undefined

export const setNotification = (notification: Notification, duration: number = 5) => {
  return (dispatch: Dispatch): void => {
    dispatch(clearMessage())
    clearTimeout(timeoutID)
    dispatch(setMessage(notification))
    timeoutID = setTimeout(() => {
      dispatch(clearMessage())
    }, duration * 1000)
  }
}

export const clearNotification = () => {
  return (dispatch: Dispatch): void => {
    clearTimeout(timeoutID)
    dispatch(clearMessage())
  }
}

export default notificationSlice.reducer
