import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import exerciseService from "../services/exercises"

// import { refetchEntries } from "./EntryReducer"

import { Exercise } from "../types"
import { AppDispatch } from "../store"

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
  return async (dispatch: AppDispatch): Promise<void> => {
    const exercises = await exerciseService.getAll()
    dispatch(
      _initializeExercises(exercises.sort((a, b) => (a.name > b.name ? 1 : -1)))
    )
  }
}

export const refetchExercises = () => initializeExercises()

export const createExercise = (
  exerciseToCreate: Omit<Exercise, "id" | "user">
) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const newExercise = await exerciseService.create(exerciseToCreate)
    dispatch(_createExercise(newExercise))
  }
}

export const updateExercise = (exerciseToUpdate: Exercise) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const updatedExercise = await exerciseService.update(
      exerciseToUpdate.id,
      exerciseToUpdate
    )
    dispatch(_updateExercise(updatedExercise))
  }
}

export const removeExercise = (id: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    await exerciseService.remove(id)
    dispatch(_removeExercise(id))
  }
}

export default exerciseSlice.reducer
