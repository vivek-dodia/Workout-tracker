import { createSelector } from "@reduxjs/toolkit"
import { selectWorkoutById } from "./workoutSelectors"
import { ExerciseGraphData, Grouping, MuscleGroup, SetWithData } from "../types"
import { selectSetsWithDataByExerciseIdSortedByAscDate } from "./setSelectors"
import { getIndexAndDate, oneRepMax } from "../utils/fn"
import { format, parseISO } from "date-fns"
import { selectIdAndGrouping } from "./commonSelectors"

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

export const selectExerciseGraphData = createSelector(
  [selectSetsWithDataByExerciseIdSortedByAscDate, selectIdAndGrouping],
  (sets: SetWithData[], grouping: Grouping): ExerciseGraphData[] => {
    return sets
      .reduce((acc, cur) => {
        const { index, date } = getIndexAndDate(acc, cur, grouping)

        if (index === -1) {
          acc.push({
            date,
            sets: 1,
            volume: cur.reps * cur.actualWeight,
            heaviestWeight: cur.actualWeight,
            orm: oneRepMax(cur.reps, cur.actualWeight),
            topSetVolume: cur.reps * cur.actualWeight,
            totalReps: cur.reps,
          })
        } else {
          acc[index].sets += 1
          acc[index].totalReps += cur.reps
          acc[index].volume += cur.reps * cur.actualWeight
          acc[index].heaviestWeight = Math.max(
            acc[index].heaviestWeight,
            cur.actualWeight
          )
          acc[index].orm = Math.max(
            acc[index].orm,
            oneRepMax(cur.reps, cur.actualWeight)
          )
          acc[index].topSetVolume = Math.max(
            acc[index].topSetVolume,
            cur.reps * cur.actualWeight
          )
        }
        return acc
      }, [] as Omit<ExerciseGraphData, "formattedDate">[])
      .map((obj) => ({
        ...obj,
        formattedDate: format(parseISO(obj.date), "dd.MM.yy"),
        orm: +obj.orm.toFixed(2),
      }))
  }
)
