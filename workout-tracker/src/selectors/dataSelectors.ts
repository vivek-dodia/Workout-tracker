import { createSelector } from "@reduxjs/toolkit"
import { selectWorkoutById } from "./workoutSelectors"
import { Workout } from "../types"
import { selectExerciseGraphData } from "./graphDataSelectors"
import { selectSetsWithDataByExerciseIdSortedByAscDate } from "./setSelectors"

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
    const heaviestWeight = sets
      .map((set) => set.actualWeight)
      .reduce((a, b) => (a > b ? a : b), 0)
    const muscleGroups = [
      ...new Set(
        w.exercises.map((exercise) => exercise._exercise.muscleGroups).flat()
      ),
    ]

    return {
      exerciseCount,
      setsCount,
      totalVolume,
      topSet,
      totalReps,
      heaviestWeight,
      muscleGroups,
    }
  }
)

export const selectExerciseData = createSelector(
  [selectExerciseGraphData, selectSetsWithDataByExerciseIdSortedByAscDate],
  (graphData, setsWithData) => {

    const dataPoints: number = graphData.length

    const sets = graphData.map((dataPoint) => dataPoint.sets)
    const reps = graphData.map((dataPoint) => dataPoint.totalReps)
    const volumes = graphData.map((dataPoint) => dataPoint.volume)
    const heaviestWeights = graphData.map(
      (dataPoint) => dataPoint.heaviestWeight
    )
    const orms = graphData.map((dataPoint) => dataPoint.orm)
    const topSetVolumes = graphData.map((dataPoint) => dataPoint.topSetVolume)

    const totalSets = sets.reduce((a, b) => a + b, 0)
    const totalReps = reps.reduce((a, b) => a + b, 0)
    const totalVolume = volumes.reduce((a, b) => a + b, 0)

    const bestWorkoutVolume = Math.max(...volumes)
    const bestSetVolume = Math.max(...topSetVolumes)
    const bestOrm = Math.max(...orms)
    const heaviestWeight = Math.max(...heaviestWeights)

    const avgWorkoutVolume = +(totalVolume / dataPoints).toFixed(2)
    const avgWorkoutReps = +(totalReps / dataPoints).toFixed(2)
    const avgWorkoutSets = +(totalSets / dataPoints).toFixed(2)

    const setRecords = setsWithData
      .reduce((acc, cur) => {
        const index = acc.findIndex((obj) => obj.reps === cur.reps)

        if (index === -1) {
          acc.push({
            reps: cur.reps,
            weight: cur.actualWeight,
            volume: cur.reps * cur.actualWeight,
          })
        } else {
          if (cur.reps * cur.actualWeight >= acc[index].volume) {
            acc[index] = {
              reps: cur.reps,
              weight: cur.actualWeight,
              volume: cur.reps * cur.actualWeight,
            }
          }
        }
        return acc
      }, [] as { reps: number; weight: number; volume: number }[])
      .sort((a, b) => a.reps - b.reps)

    return {
      totalSets,
      totalReps,
      totalVolume,
      avgWorkoutSets,
      avgWorkoutReps,
      avgWorkoutVolume,
      bestWorkoutVolume,
      bestSetVolume,
      heaviestWeight,
      bestOrm,
      setRecords,
    }
  }
)
