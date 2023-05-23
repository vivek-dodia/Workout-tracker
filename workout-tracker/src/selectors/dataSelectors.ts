import { createSelector } from "@reduxjs/toolkit"
import { selectWorkoutById } from "./workoutSelectors"
import { Workout } from "../types"

export const selectWorkoutData = createSelector(
  [selectWorkoutById],
  (workout) => {
    const w = workout as Workout
    const sets = w.exercises.map((exercise) => exercise.sets).flat()
    const exerciseCount = w.exercises.length
    const setsCount = sets.length
    const totalVolume = sets
      .map((set) => set.reps * set.actualWeight)
      .reduce((a, b) => a + b, 0)
    const topSet = sets.reduce(
      (acc, cur) => {
        const max = acc.reps * acc.weight
        const newMax = cur.reps * cur.actualWeight
        if (newMax > max) {
          acc.reps = cur.reps
          acc.weight = cur.actualWeight
        }
        return acc
      },
      { reps: 0, weight: 0 }
    )
    const totalReps = sets.map((set) => set.reps).reduce((a, b) => a + b, 0)
    const heaviestWeight = sets.map((set) => set.actualWeight).reduce((a, b) => a > b ? a : b, 0)
    const muscleGroups = [...new Set(w.exercises.map((exercise) => exercise._exercise.muscleGroups).flat())]

    return { exerciseCount, setsCount, totalVolume, topSet, totalReps, heaviestWeight, muscleGroups }
  }
)
