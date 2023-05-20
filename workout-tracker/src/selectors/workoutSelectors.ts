import { createSelector } from "@reduxjs/toolkit"

import { selectId, selectQuery } from "./commonSelectors"

import { RootState } from "../store"
import { Workout } from "../types"

export const selectWorkouts = createSelector(
  [(state: RootState): Workout[] => state.workouts],
  (workouts: Workout[]): Workout[] => {
    return workouts
  }
)

export const selectWorkoutsByQuery = createSelector(
  [selectWorkouts, selectQuery],
  (workouts: Workout[], query: string): Workout[] => {
    return workouts.filter((workout) =>
      workout.name.toLowerCase().includes(query.toLowerCase())
    )
  }
)

export const selectWorkoutById = createSelector(
  [selectWorkouts, selectId],
  (workouts: Workout[], id: string): Workout | undefined => {
    return workouts.find((workout) => workout.id === id)
  }
)
