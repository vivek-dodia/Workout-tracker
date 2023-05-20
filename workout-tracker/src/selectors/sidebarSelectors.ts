import { RootState } from "../store"

export const selectSidebarOpen = (state: RootState): boolean => state.sidebar.open

