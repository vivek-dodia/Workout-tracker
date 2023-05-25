import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import exerciseService from "../services/exercises"
import {
  removeExerciseFromWorkouts,
  updateExerciseForWorkouts,
} from "./workoutReducer"

import { Exercise, NotificationType } from "../types"
import { AppDispatch } from "../store"
import { setNotification } from "./notificationReducer"

export type ExercisesState = Exercise[]

const initialState = [] as ExercisesState

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    _initializeExercises(
      _,
      { payload }: PayloadAction<Exercise[]>
    ): ExercisesState {
      return payload
    },
    _createExercise(
      state,
      { payload }: PayloadAction<Exercise>
    ): ExercisesState {
      return state.concat(payload)
    },
    _updateExercise(
      state,
      { payload }: PayloadAction<Exercise>
    ): ExercisesState {
      return state.map((exercise) =>
        exercise.id === payload.id ? payload : exercise
      )
    },
    _removeExercise(state, { payload }: PayloadAction<string>): ExercisesState {
      return state.filter((exercise) => exercise.id !== payload)
    },
  },
})

const {
  _initializeExercises,
  _createExercise,
  _updateExercise,
  _removeExercise,
} = exerciseSlice.actions

// ACTIONS

export const initializeExercises = () => {
  return async (dispatch: AppDispatch): Promise<Exercise[]> => {
    const exercises = await exerciseService.getAll()
    dispatch(_initializeExercises(exercises))
    dispatch(
      setNotification({
        message: "Initialized Exercises",
        type: NotificationType.success,
      })
    )
    return exercises
  }
}

export const refetchExercises = () => initializeExercises()

export const createExercise = (
  exerciseToCreate: Omit<Exercise, "id" | "user">
) => {
  return async (dispatch: AppDispatch): Promise<Exercise> => {
    const newExercise = await exerciseService.create(exerciseToCreate)
    dispatch(_createExercise(newExercise))
    dispatch(
      setNotification({
        message: `Created exercise: ${newExercise.name}`,
        type: NotificationType.success,
      })
    )
    return newExercise
  }
}

export const updateExercise = (exerciseToUpdate: Exercise) => {
  return async (dispatch: AppDispatch): Promise<Exercise> => {
    const updatedExercise = await exerciseService.update(
      exerciseToUpdate.id,
      exerciseToUpdate
    )
    dispatch(_updateExercise(updatedExercise))
    dispatch(updateExerciseForWorkouts(updatedExercise))
    dispatch(
      setNotification({
        message: `Updated exercise: ${updatedExercise.name}`,
        type: NotificationType.success,
      })
    )
    return updatedExercise
  }
}

export const removeExercise = (id: string) => {
  return async (dispatch: AppDispatch): Promise<Exercise> => {
    const removedExercise = await exerciseService.remove(id)
    dispatch(_removeExercise(id))
    dispatch(removeExerciseFromWorkouts(id))
    dispatch(
      setNotification({
        message: `Deleted exercise: ${removedExercise.name}`,
        type: NotificationType.success,
      })
    )
    return removedExercise
  }
}

export default exerciseSlice.reducer
