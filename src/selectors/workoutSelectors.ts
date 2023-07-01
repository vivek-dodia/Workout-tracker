import { createSelector } from "@reduxjs/toolkit"

import { selectId, selectQuery } from "./commonSelectors"

import { RootState } from "../store"
import { FormWorkout, SetStatusType, Workout } from "../types"
import { compareDesc, parseISO } from "date-fns"

export const selectWorkouts = createSelector(
  [(state: RootState): Workout[] => state.workouts],
  (workouts: Workout[]): Workout[] => {
    return [...workouts].sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    )
  }
)

export const selectRecentWorkouts = createSelector(
  [(state: RootState): Workout[] => state.workouts],
  (workouts: Workout[]): Workout[] => {
    return [...workouts]
      .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))
      .slice(0, 10)
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

export const selectRecentWorkoutsByQuery = createSelector(
  [selectRecentWorkouts, selectQuery],
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

export const selectFormWorkoutById = createSelector(
  [selectWorkouts, selectId],
  (workouts: Workout[], id: string): FormWorkout | undefined => {
    const workout = workouts.find((workout) => workout.id === id)
    if (!workout) return undefined

    const { name, notes, date, duration, exercises } = workout

    const formWorkout: FormWorkout = {
      name,
      notes,
      date,
      duration: duration.toString(),
      exercises: exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          type: set.type,
          reps: set.reps.toString(),
          weight: set.weight.toString(),
          status: SetStatusType.incomplete,
        })),
      })),
    }

    return formWorkout
  }
)

export const selectWorkoutsSortedByDescDate = createSelector(
  [selectWorkouts],
  (workouts: Workout[]): Workout[] => {
    return [...workouts].sort((a, b) =>
      compareDesc(parseISO(a.date), parseISO(b.date))
    )
  }
)

export const selectWorkoutsByExerciseId = createSelector(
  [selectWorkoutsSortedByDescDate, selectId],
  (workouts: Workout[], id: string): Workout[] => {
    return workouts.filter((workout) =>
      workout.exercises.map((exercise) => exercise._exercise.id).includes(id)
    )
  }
)
