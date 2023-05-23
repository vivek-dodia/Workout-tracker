import { FormSet, SetType, FormWorkout, SetStatusType } from "../types"

export const EMPTY_SET: FormSet = {
  type: SetType.working,
  status: SetStatusType.incomplete,
  reps: "",
  weight: "",
}

export const EMPTY_WORKOUT: FormWorkout = {
  name: "",
  notes: "",
  date: new Date().toISOString(),
  duration: "0",
  exercises: [],
}

export const REGEX_DECIMAL = /^-?\d+\.?\d*$/
export const REGEX_INT = /^(?!0{2,})\d+$/
