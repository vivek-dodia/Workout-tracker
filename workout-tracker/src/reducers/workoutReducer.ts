import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import workoutService from "../services/workouts"

import { NotificationType, Workout } from "../types"
import { setNotification } from "./notificationReducer"
import { AppDispatch } from "../store"

export type WorkoutsState = Workout[]

const initialState = [] as WorkoutsState

export const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    _initializeWorkouts(
      _,
      { payload }: PayloadAction<Workout[]>
    ): WorkoutsState {
      return payload
    },
    _createWorkout(state, { payload }: PayloadAction<Workout>): WorkoutsState {
      return state.concat(payload)
    },
    _updateWorkout(state, { payload }: PayloadAction<Workout>): WorkoutsState {
      return state.map((workout) =>
        workout.id === payload.id ? payload : workout
      )
    },
    _removeWorkout(state, { payload }: PayloadAction<string>): WorkoutsState {
      return state.filter((workout) => workout.id !== payload)
    },
  },
})

const { _initializeWorkouts, _createWorkout, _updateWorkout, _removeWorkout } =
  workoutSlice.actions

// ACTIONS

export const initializeWorkouts = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const workouts = await workoutService.getAll()
    dispatch(
      _initializeWorkouts(workouts.sort((a, b) => (a.name > b.name ? 1 : -1)))
    )
    dispatch(
      setNotification({
        message: "Initialized Workouts",
        type: NotificationType.success,
      })
    )
  }
}

export const refetchWorkouts = () => initializeWorkouts()

export const createWorkout = (
  workoutToCreate: Omit<Workout, "id" | "user">
) => {
  return async (dispatch: AppDispatch): Promise<Workout> => {
    const newWorkout = await workoutService.create(workoutToCreate)
    dispatch(_createWorkout(newWorkout))
    return newWorkout
  }
}

export const updateWorkout = (workoutToUpdate: Workout) => {
  return async (dispatch: AppDispatch): Promise<Workout> => {
    const updatedWorkout = await workoutService.update(
      workoutToUpdate.id,
      workoutToUpdate
    )
    dispatch(_updateWorkout(updatedWorkout))
    return updatedWorkout
  }
}

export const removeWorkout = (id: string) => {
  return async (dispatch: AppDispatch): Promise<Workout> => {
    const removedWorkout = await workoutService.remove(id)
    dispatch(_removeWorkout(id))
    dispatch(
      setNotification({
        message: `Deleted workout: ${removedWorkout.name}`,
        type: NotificationType.success,
      })
    )
    return removedWorkout
  }
}

export default workoutSlice.reducer
