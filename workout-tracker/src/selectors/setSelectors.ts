import { createSelector } from "@reduxjs/toolkit"
import { Workout, SetWithData } from "../types"
import { compareAsc, compareDesc, parseISO } from "date-fns"

import { selectWorkouts } from "./workoutSelectors"
import { selectId } from "./commonSelectors"

export const selectSetsWithData = createSelector(
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

export const selectSetsWithDataByExerciseId = createSelector(
  [selectSetsWithData, selectId],
  (sets: SetWithData[], id: string): SetWithData[] => {
    return sets.filter((set) => set.exerciseId === id)
  }
)

export const selectSetsWithDataSortedByDescDate = createSelector(
  [selectSetsWithData],
  (sets: SetWithData[]): SetWithData[] => {
    return [...sets].sort((a, b) =>
      compareDesc(parseISO(a.date), parseISO(b.date))
    )
  }
)

export const selectSetsWithDataSortedByAscDate = createSelector(
  [selectSetsWithData],
  (sets: SetWithData[]): SetWithData[] => {
    const start = performance.now()

    const res = [...sets].sort((a, b) =>
      compareAsc(parseISO(a.date), parseISO(b.date))
    )
    const end = performance.now()
    console.log(`Execution time: ${end - start} ms`)
    return res
  }
)

export const selectSetsWithDataByExerciseIdSortedByDescDate = createSelector(
  [selectSetsWithDataSortedByDescDate, selectId],
  (sets: SetWithData[], id: string): SetWithData[] => {
    return sets.filter((set) => set.exerciseId === id)
  }
)

export const selectSetsWithDataByExerciseIdSortedByAscDate = createSelector(
  [selectSetsWithDataSortedByAscDate, selectId],
  (sets: SetWithData[], id: string): SetWithData[] => {
    return sets.filter((set) => set.exerciseId === id)
  }
)
