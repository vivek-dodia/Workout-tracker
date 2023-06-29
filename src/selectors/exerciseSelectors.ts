import { createSelector } from "@reduxjs/toolkit"

import { selectId, selectQuery } from "./commonSelectors"

import { RootState } from "../store"
import { Exercise, FormExerciseWithUser } from "../types"

import {
  EQUIPMENT_OPTIONS,
  EXERCISE_TYPE_OPTIONS,
  MUSCLE_GROUP_OPTIONS,
} from "../utils/const"

export const selectExercises = createSelector(
  [(state: RootState): Exercise[] => state.exercises],
  (exercises: Exercise[]): Exercise[] => {
    return [...exercises].sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    )
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

export const selectFormExerciseById = createSelector(
  [selectExercises, selectId],
  (exercises: Exercise[], id: string): FormExerciseWithUser | undefined => {
    const exercise = exercises.find((exercise) => exercise.id === id)
    if (!exercise) return undefined

    const { name, user, videoId, muscleGroups, equipment, type, bodyweightFactor } =
      exercise

    const formExercise: FormExerciseWithUser = {
      name,
      videoId,
      user,
      muscleGroups: MUSCLE_GROUP_OPTIONS.filter((option) =>
        muscleGroups.includes(option.value)
      ),
      equipment: EQUIPMENT_OPTIONS.find(
        (option) => option.value === equipment
      )!,
      type: EXERCISE_TYPE_OPTIONS.find((option) => option.value === type)!,
      bodyweightFactor: bodyweightFactor.toString(),
    }

    return formExercise
  }
)
