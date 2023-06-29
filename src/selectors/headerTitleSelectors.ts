import { RootState } from "../store"

export const selectHeaderTitle = (state: RootState): string => state.headerTitle
