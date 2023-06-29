import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"

export type SidebarState = {
  open: boolean
}

const initialState = { open: false } as SidebarState

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    close(): SidebarState {
      return { open: false }
    },
    toggle(state): SidebarState {
      return { open: !state.open }
    },
  },
})

const { close, toggle } = sidebarSlice.actions

export const toggleSidebar = () => {
  return (dispatch: AppDispatch): void => {
    dispatch(toggle())
  }
}

export const closeSidebar = () => {
  return (dispatch: AppDispatch): void => {
    dispatch(close())
  }
}

export default sidebarSlice.reducer
