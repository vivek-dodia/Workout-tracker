import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import storageService from "../services/storage"
import signInService from "../services/signIn"
import userService from "../services/users"

import { Credentials, NewCredentials, User } from "../types"
import { AppDispatch } from "../store"

export type UserState = User | null

const initialState = null as UserState

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    _setUser(_, { payload }: PayloadAction<User>): User {
      return payload
    },
    _removeUser(): UserState {
      return null
    },
  },
})

const { _setUser, _removeUser } = userSlice.actions

export const initUser = () => {
  return (dispatch: AppDispatch): void => {
    const userFromStorage = storageService.loadUser()
    if (userFromStorage) dispatch(_setUser(userFromStorage))
  }
}

export const signIn = (credentials: Credentials) => {
  return async (dispatch: AppDispatch): Promise<string> => {
    const { email, password } = credentials
    const user = await signInService.signIn({ email, password })
    storageService.saveUser(user)
    dispatch(_setUser(user))
    return user.username
  }
}

export const signOut = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    storageService.removeUser()
    dispatch(_removeUser())
  }
}

export const updateUser = (userToUpdate: User) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const newUser = await userService.update(userToUpdate.id, userToUpdate)
    storageService.saveUser(newUser)
    dispatch(_setUser(newUser))
  }
}

export const removeUser = (id: string) => {
  return async (dispatch: AppDispatch): Promise<User> => {
    const removedUser = await userService.remove(id)
    storageService.removeUser()
    dispatch(_removeUser())
    return removedUser
  }
}

export const signUp = (newCredentials: NewCredentials) => {
  return async (dispatch: AppDispatch): Promise<string> => {
    await userService.create(newCredentials)
    const user = await signInService.signIn({
      email: newCredentials.email,
      password: newCredentials.password,
    })
    storageService.saveUser(user)
    dispatch(_setUser(user))
    return user.username
  }
}

export default userSlice.reducer
