import { ExerciseType } from "../types"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import { RootState } from "../store"

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
  const bw = user.measurements.bodyweight * bodyweightFactor

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
