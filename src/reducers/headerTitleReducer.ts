import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"

export type HeaderTitleState = string

const initialState = "" as HeaderTitleState

const headerTitleSlice = createSlice({
  name: "headerTitle",
  initialState,
  reducers: {
    setTitle(_, { payload }: PayloadAction<HeaderTitleState>): HeaderTitleState {
      return payload
    },
    clearTitle(): HeaderTitleState {
      return ""
    },
  },
})

const { setTitle, clearTitle } = headerTitleSlice.actions

export const setHeaderTitle = (title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setTitle(title))
  }
}

export const clearHeaderTitle = () => {
  return (dispatch: AppDispatch) => {
    dispatch(clearTitle())
  }
}

export default headerTitleSlice.reducer
