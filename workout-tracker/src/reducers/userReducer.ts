import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import storageService from "../services/storage"
import signInService from "../services/signIn"
import userService from "../services/users"

import { Credentials, User } from "../types"

export type UserState = User | null

const initialState = null as UserState

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_, { payload }: PayloadAction<User>): User {
      return payload
    },
    removeUser(): UserState {
      return null
    },
  },
})

const { setUser, removeUser } = userSlice.actions

export const initUser = () => {
  return (dispatch: Dispatch): void => {
    const userFromStorage = storageService.loadUser()
    if (userFromStorage) dispatch(setUser(userFromStorage))
  }
}

export const signIn = (credentials: Credentials) => {
  return async (dispatch: Dispatch): Promise<string> => {
    const { email, password } = credentials
    const user = await signInService.signIn({ email, password })
    storageService.saveUser(user)
    dispatch(setUser(user))
    return user.username
  }
}

export const signOut = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    storageService.removeUser()
    dispatch(removeUser())
  }
}

export const updateUser = (userToUpdate: User) => {
  return async (dispatch: Dispatch): Promise<void> => {
    const newUser = await userService.update(userToUpdate.id, userToUpdate)
    storageService.saveUser(newUser)
    dispatch(setUser(newUser))
  }
}

export default userSlice.reducer
