import { createSelector } from "@reduxjs/toolkit"
import { selectWorkoutById } from "./workoutSelectors"
import { MuscleGroup } from "../types"

export const selectWorkoutGraphData = createSelector(
  [selectWorkoutById],
  (workout) => {
    let totalVolume = 0
    let totalSets = 0
    const data = workout?.exercises.reduce((acc, cur) => {
      cur._exercise.muscleGroups.map((muscle) => {
        const index = acc.findIndex((obj) => obj.muscle === muscle)
        const sets = cur.sets.length
        const volume = cur.sets
          .map((set) => set.reps * set.actualWeight)
          .reduce((a, b) => a + b, 0)

        totalVolume += volume
        totalSets += sets

        if (index === -1) {
          acc.push({
            muscle,
            sets,
            volume,
          })
        } else {
          acc[index].sets += sets
          acc[index].volume += volume
        }
      })
      return acc
    }, [] as { muscle: MuscleGroup; sets: number; volume: number }[])
    return data?.map((obj) => ({
      ...obj,
      percentVolume: ((obj.volume / totalVolume) * 100).toFixed(1) + "%",
      percentSets: ((obj.sets / totalSets) * 100).toFixed(1) + "%",
    }))
  }
)
