import { createSlice, Dispatch } from "@reduxjs/toolkit"

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
  return (dispatch: Dispatch): void => {
    dispatch(toggle())
  }
}

export const closeSidebar = () => {
  return (dispatch: Dispatch): void => {
    dispatch(close())
  }
}

export default sidebarSlice.reducer
