import { createSelector } from "@reduxjs/toolkit"
import { selectWorkoutById } from "./workoutSelectors"
import {
  ExerciseGraphData,
  ExerciseStats,
  SetWithData,
  Workout,
} from "../types"
import {
  selectExerciseGraphData,
  selectOverallGraphData,
  selectWorkoutsGraphData,
} from "./graphDataSelectors"
import { selectSetsWithDataByExerciseId } from "./setSelectors"

export const selectWorkoutStats = createSelector(
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

const parseNumber = (value: number): number => {
  return isFinite(value) ? value : 0
}

export const selectExerciseStats = createSelector(
  [selectExerciseGraphData, selectSetsWithDataByExerciseId],
  (
    graphData: ExerciseGraphData[],
    setsWithData: SetWithData[]
  ): ExerciseStats => {
    const dataPoints: number = graphData.length

    const sets = graphData.map((dataPoint) => dataPoint.sets)
    const reps = graphData.map((dataPoint) => dataPoint.totalReps)
    const volumes = graphData.map((dataPoint) => dataPoint.volume)
    const heaviestWeights = graphData.map(
      (dataPoint) => dataPoint.heaviestWeight
    )
    const orms = graphData.map((dataPoint) => dataPoint.orm)
    const topSetVolumes = graphData.map((dataPoint) => dataPoint.topSetVolume)

    const totalSets = parseNumber(sets.reduce((a, b) => a + b, 0))
    const totalReps = parseNumber(reps.reduce((a, b) => a + b, 0))
    const totalVolume = parseNumber(volumes.reduce((a, b) => a + b, 0))

    const bestWorkoutVolume = parseNumber(Math.max(...volumes))
    const bestSetVolume = parseNumber(Math.max(...topSetVolumes))
    const bestOrm = parseNumber(Math.max(...orms))
    const heaviestWeight = parseNumber(Math.max(...heaviestWeights))

    const avgWorkoutVolume = parseNumber(+(totalVolume / dataPoints).toFixed(2))
    const avgWorkoutReps = parseNumber(+(totalReps / dataPoints).toFixed(2))
    const avgWorkoutSets = parseNumber(+(totalSets / dataPoints).toFixed(2))

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

export const selectOverallStats = createSelector(
  [selectOverallGraphData, selectWorkoutsGraphData],
  (overallGraphData, workoutsGraphData) => {
    const dataPoints: number = overallGraphData.length

    const sets = overallGraphData.map((dataPoint) => dataPoint.sets)
    const reps = overallGraphData.map((dataPoint) => dataPoint.reps)
    const volumes = overallGraphData.map((dataPoint) => dataPoint.volume)
    const durations = workoutsGraphData.map(
      (dataPoint) => dataPoint.totalDuration
    )

    const totalSets = parseNumber(sets.reduce((a, b) => a + b, 0))
    const totalReps = parseNumber(reps.reduce((a, b) => a + b, 0))
    const totalVolume = parseNumber(volumes.reduce((a, b) => a + b, 0))
    const totalDuration = parseNumber(durations.reduce((a, b) => a + b, 0))

    const bestWorkoutVolume = parseNumber(Math.max(...volumes))
    const bestWorkoutSets = parseNumber(Math.max(...sets))

    const avgWorkoutVolume = parseNumber(+(totalVolume / dataPoints).toFixed(2))
    const avgWorkoutReps = parseNumber(+(totalReps / dataPoints).toFixed(2))
    const avgWorkoutSets = parseNumber(+(totalSets / dataPoints).toFixed(2))
    const avgWorkoutDuration = parseNumber(
      +(totalDuration / dataPoints).toFixed(2)
    )

    return {
      workoutCount: dataPoints,
      totalSets,
      totalReps,
      totalVolume,
      totalDuration,
      avgWorkoutSets,
      avgWorkoutReps,
      avgWorkoutVolume,
      avgWorkoutDuration,
      bestWorkoutVolume,
      bestWorkoutSets,
    }
  }
)
