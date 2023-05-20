import { createSelector } from "@reduxjs/toolkit"

import { selectId, selectQuery } from "./commonSelectors"

import { RootState } from "../store"
import { Exercise } from "../types"

export const selectExercises = createSelector(
  [(state: RootState): Exercise[] => state.exercises],
  (exercises: Exercise[]): Exercise[] => {
    return exercises
  }
)

export const selectExercisesByQuery = createSelector(
  [selectExercises, selectQuery],
  (exercises: Exercise[], query: string): Exercise[] => {
    return exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(query.toLowerCase())
    )
  }
)

export const selectExerciseById = createSelector(
  [selectExercises, selectId],
  (exercises: Exercise[], id: string): Exercise | undefined => {
    return exercises.find((exercise) => exercise.id === id)
  }
)
