import { createSelector } from "@reduxjs/toolkit"
import { selectWorkoutById, selectWorkouts } from "./workoutSelectors"
import {
  ExerciseGraphData,
  Grouping,
  OverallGraphData,
  SetWithData,
  Workout,
} from "../types"
import {
  selectSetsWithData,
  selectSetsWithDataByExerciseId,
} from "./setSelectors"
import { getDateByGrouping, oneRepMax } from "../utils/fn"
import { compareAsc, format, parseISO, startOfISOWeek } from "date-fns"
import { selectGrouping, selectIdAndGrouping } from "./commonSelectors"

export const selectWorkoutGraphData = createSelector(
  [selectWorkoutById],
  (workout) => {
    const start = performance.now()

    let totalVolume = 0
    let totalSets = 0
    const muscleMap = new Map()

    workout?.exercises.forEach((exercise) => {
      const muscleGroups = exercise._exercise.muscleGroups
      const sets = exercise.sets
      const setsCount = sets.length
      const volume = sets
        .map((set) => set.reps * set.actualWeight)
        .reduce((a, b) => a + b, 0)

      muscleGroups.forEach((muscle) => {
        totalVolume += volume
        totalSets += setsCount

        if (muscleMap.has(muscle)) {
          const mapValue = muscleMap.get(muscle)
          const newMapValue = {
            ...mapValue,
            sets: mapValue.sets + setsCount,
            volume: mapValue.volume + volume,
          }
          muscleMap.set(muscle, newMapValue)
        } else {
          muscleMap.set(muscle, {
            muscle,
            sets: setsCount,
            volume,
          })
        }
      })
    })

    const graphData = [...muscleMap.values()].map((obj) => ({
      ...obj,
      percentVolume: ((obj.volume / totalVolume) * 100).toFixed(1) + "%",
      percentSets: ((obj.sets / totalSets) * 100).toFixed(1) + "%",
    }))

    const end = performance.now()
    console.log(`Execution time: ${end - start} ms`)
    return graphData
  }
)

export const selectExerciseGraphData = createSelector(
  [selectSetsWithDataByExerciseId, selectIdAndGrouping],
  (sets: SetWithData[], grouping: Grouping): ExerciseGraphData[] => {
    const start = performance.now()

    const graphDataMap = new Map()

    sets.forEach((set) => {
      const date = getDateByGrouping(set.date, grouping)
      if (graphDataMap.has(date)) {
        const mapValue = graphDataMap.get(date)
        const newMapValue = {
          ...mapValue,
          sets: mapValue.sets + 1,
          volume: mapValue.volume + set.reps * set.actualWeight,
          totalReps: mapValue.totalReps + set.reps,
          heaviestWeight: Math.max(mapValue.heaviestWeight, set.actualWeight),
          orm: Math.max(mapValue.orm, oneRepMax(set.reps, set.actualWeight)),
          topSetVolume: Math.max(
            mapValue.topSetVolume,
            set.reps * set.actualWeight
          ),
        }
        graphDataMap.set(date, newMapValue)
      } else {
        graphDataMap.set(date, {
          date,
          formattedDate: format(parseISO(date), "dd.MM.yy"),
          sets: 1,
          volume: set.reps * set.actualWeight,
          heaviestWeight: set.actualWeight,
          orm: oneRepMax(set.reps, set.actualWeight),
          topSetVolume: set.reps * set.actualWeight,
          totalReps: set.reps,
        })
      }
    })

    const graphData: ExerciseGraphData[] = [...graphDataMap.values()].sort(
      (a, b) => compareAsc(parseISO(a.date), parseISO(b.date))
    )

    const end = performance.now()
    console.log(`Execution time: ${end - start} ms`)

    return graphData
  }
)

export const selectOverallGraphData = createSelector(
  [selectSetsWithData, selectGrouping],
  (sets: SetWithData[], grouping: Grouping): OverallGraphData[] => {
    const start = performance.now()

    const graphDataMap: Map<string, OverallGraphData> = new Map()

    sets.forEach((set) => {
      const date = getDateByGrouping(set.date, grouping)
      console.log(date)
      if (graphDataMap.has(date)) {
        const mapValue = graphDataMap.get(date)!
        const newMapValue = {
          ...mapValue,
          sets: mapValue.sets + 1,
          reps: mapValue.reps + set.reps,
          volume: mapValue.volume + set.reps * set.actualWeight,
        }
        graphDataMap.set(date, newMapValue)
      } else {
        graphDataMap.set(date, {
          date,
          formattedDate: format(parseISO(date), "dd.MM.yy"),
          sets: 1,
          volume: set.reps * set.actualWeight,
          reps: set.reps,
        })
      }
    })

    const graphData: OverallGraphData[] = [...graphDataMap.values()].sort(
      (a, b) => compareAsc(parseISO(a.date), parseISO(b.date))
    )

    const end = performance.now()
    console.log(`Execution time: ${end - start} ms`)

    return graphData
  }
)

export const selectWorkoutsGraphData = createSelector(
  [selectWorkouts],
  (workouts: Workout[]) => {
    const start = performance.now()

    const graphDataMap = new Map()

    workouts.forEach((workout) => {
      const date = startOfISOWeek(parseISO(workout.date)).toISOString()
      if (graphDataMap.has(date)) {
        const mapValue = graphDataMap.get(date)
        const newMapValue = {
          ...mapValue,
          totalDuration: mapValue.totalDuration + workout.duration,
          workoutCount: mapValue.workoutCount + 1
        }
        graphDataMap.set(date, newMapValue)
      } else {
        graphDataMap.set(date, {
          date,
          formattedDate: format(parseISO(date), "dd.MM.yy"),
          totalDuration: workout.duration,
          workoutCount: 1
        })
      }
    })

    const graphData = [...graphDataMap.values()].sort(
      (a, b) => compareAsc(parseISO(a.date), parseISO(b.date))
    )

    const end = performance.now()
    console.log(`Execution time: ${end - start} ms`)

    return graphData
  }
)

export const selectOverallMusclesGraphData = createSelector(
  [selectWorkouts],
  (workouts: Workout[]) => {
    const start = performance.now()

    let totalVolume = 0
    let totalSets = 0
    const muscleMap = new Map()

    workouts
      .map((workout) => workout.exercises)
      .flat()
      .forEach((exercise) => {
        const muscleGroups = exercise._exercise.muscleGroups
        const sets = exercise.sets
        const setsCount = sets.length
        const volume = sets
          .map((set) => set.reps * set.actualWeight)
          .reduce((a, b) => a + b, 0)

        muscleGroups.forEach((muscle) => {
          totalVolume += volume
          totalSets += setsCount

          if (muscleMap.has(muscle)) {
            const mapValue = muscleMap.get(muscle)
            const newMapValue = {
              ...mapValue,
              sets: mapValue.sets + setsCount,
              volume: mapValue.volume + volume,
            }
            muscleMap.set(muscle, newMapValue)
          } else {
            muscleMap.set(muscle, {
              muscle,
              sets: setsCount,
              volume,
            })
          }
        })
      })

    const graphData = [...muscleMap.values()].map((obj) => ({
      ...obj,
      percentVolume: ((obj.volume / totalVolume) * 100).toFixed(1) + "%",
      percentSets: ((obj.sets / totalSets) * 100).toFixed(1) + "%",
    }))

    const end = performance.now()
    console.log(`Execution time: ${end - start} ms`)
    return { graphData, totalSets, totalVolume }
  }
)
