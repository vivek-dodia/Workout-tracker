import {
  ExerciseGraphData,
  ExerciseType,
  ExerciseTypeOption,
  Grouping,
  SetWithData,
} from "../types"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import { RootState } from "../store"
import {
  format,
  isSameISOWeek,
  isSameMonth,
  parseISO,
  startOfISOWeek,
  startOfMonth,
} from "date-fns"

let store: ToolkitStore

export const injectStore = (_store: ToolkitStore): void => {
  store = _store
}

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ")
}

export const arrayMove = <T>(
  array: T[],
  fromIndex: number,
  toIndex: number
): T[] => {
  if (fromIndex === toIndex) {
    return array.slice() // Return a copy of the original array
  }

  const newArray = array.slice() // Create a copy of the original array
  const element = newArray[fromIndex]
  newArray.splice(fromIndex, 1) // Remove the element from its current position
  newArray.splice(toIndex, 0, element) // Insert the element at the new position

  return newArray
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number"
}

export const getWeight = (
  exerciseType: ExerciseType,
  bodyweightFactor: number,
  setWeight: number
) => {
  const state: RootState = store.getState()
  const user = state.user!
  const bw = user.measurements.bodyweight * (bodyweightFactor / 100)

  switch (exerciseType) {
    case ExerciseType.repsAndKg:
      return setWeight
    case ExerciseType.repsAndBw:
      return bw
    case ExerciseType.repsAndMinusKg:
      return bw - setWeight
    case ExerciseType.repsAndPlusKg:
      return bw + setWeight
    default:
      return setWeight
  }
}

export const getExerciseTypeOption = (
  type: ExerciseType
): ExerciseTypeOption => {
  switch (type) {
    case ExerciseType.repsAndKg:
      return { label: "Reps & Weight", value: ExerciseType.repsAndKg }
    case ExerciseType.repsAndBw:
      return { label: "Bodyweight Reps", value: ExerciseType.repsAndBw }
    case ExerciseType.repsAndPlusKg:
      return { label: "Weighted Bodyweight", value: ExerciseType.repsAndPlusKg }
    case ExerciseType.repsAndMinusKg:
      return {
        label: "Assisted Bodyweight",
        value: ExerciseType.repsAndMinusKg,
      }
    default:
      return { label: "Reps & Weight", value: ExerciseType.repsAndKg }
  }
}

// Brzycki 1RM formula
// 1RM = w / [1.0278 - (0.0278 * r)]
// accurate for <= 10 reps
export const brzycki1RM = (r: number, w: number): number => {
  return +(w / (1.0278 - 0.0278 * r)).toFixed(2)
}
// Epley 1RM formula
// 1RM = w * (1 + (0.0333 * r))
// Better than Brzycki for > 10 reps
export const epley1RM = (r: number, w: number): number => {
  return +(w * (1 + 0.0333 * r)).toFixed(2)
}

export const oneRepMax = (r: number, w: number) => {
  const reps = r
  const weight = w
  if (reps <= 0 || weight <= 0) return 0
  return reps > 10 ? epley1RM(reps, weight) : brzycki1RM(reps, weight)
}

export const formatDate = (date: Date): string => {
  return format(date, "dd.MM.yy")
}

export const formatStrDate = (date: string): string => {
  return format(parseISO(date), "dd.MM.yy")
}

export const getIndexAndDate = (
  acc: Omit<ExerciseGraphData, "formattedDate">[],
  cur: SetWithData,
  grouping: Grouping
): {
  index: number
  date: string
} => {
  switch (grouping) {
    case Grouping.byDate:
      return {
        index: acc.findIndex((obj) =>
          !obj.date ? false : obj.date === cur.date
        ),
        date: cur.date,
      }
    case Grouping.byWeek:
      return {
        index: acc.findIndex((obj) =>
          !obj.date
            ? false
            : isSameISOWeek(parseISO(obj.date), parseISO(cur.date))
        ),
        date: startOfISOWeek(parseISO(cur.date)).toISOString(),
      }
    case Grouping.byMonth:
      return {
        index: acc.findIndex((obj) =>
          !obj.date
            ? false
            : isSameMonth(parseISO(obj.date), parseISO(cur.date))
        ),
        date: startOfMonth(parseISO(cur.date)).toISOString(),
      }
    default:
      return {
        index: acc.findIndex((obj) =>
          !obj.date ? false : obj.date === cur.date
        ),
        date: cur.date,
      }
  }
}

export const getDateByGrouping = (date: string, grouping: Grouping): string => {
  switch (grouping) {
    case Grouping.byDate:
      return date
    case Grouping.byWeek:
      return startOfISOWeek(parseISO(date)).toISOString()
    case Grouping.byMonth:
      return startOfMonth(parseISO(date)).toISOString()
    default:
      return date
  }
}
