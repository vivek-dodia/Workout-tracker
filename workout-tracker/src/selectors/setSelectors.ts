import { createSelector } from "@reduxjs/toolkit"
import { Workout, SetWithData } from "../types"
import { compareDesc, parseISO } from "date-fns"

import { selectWorkouts } from "./workoutSelectors"

export const selecSetsWithData = createSelector(
  [selectWorkouts],
  (workouts: Workout[]): SetWithData[] => {
    return workouts
      .map((workout) =>
        workout.exercises.map((exercise) => {
          return exercise.sets.map((set, i) => ({
            ...set,
            exerciseId: exercise._exercise.id,
            setIndex: i,
            date: workout.date,
          }))
        })
      )
      .flat()
      .flat()
  }
)

export const selecSetsWithDataSortedByDescDate = createSelector(
  [selecSetsWithData],
  (sets: SetWithData[]): SetWithData[] => {
    return [...sets].sort((a, b) =>
      compareDesc(parseISO(a.date), parseISO(b.date))
    )
  }
)
