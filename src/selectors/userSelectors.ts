import { RootState } from "../store"
import { User } from "../types"

export const selectUser = (state: RootState): User | null => state.user
