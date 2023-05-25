import {
  FormSet,
  SetType,
  FormWorkout,
  SetStatusType,
  FormExercise,
  ExerciseType,
  Equipment,
  EquipmentOption,
  MuscleGroupOption,
  MuscleGroup,
  ExerciseTypeOption,
} from "../types"

import { getExerciseTypeOption } from "./fn"

export const EQUIPMENT_OPTIONS: EquipmentOption[] = Object.values(
  Equipment
).map((value) => ({ label: value, value }))

export const MUSCLE_GROUP_OPTIONS: MuscleGroupOption[] = Object.values(
  MuscleGroup
).map((value) => ({ label: value, value }))

export const EXERCISE_TYPE_OPTIONS: ExerciseTypeOption[] = Object.values(
  ExerciseType
).map((value) => getExerciseTypeOption(value))

export const EMPTY_SET: FormSet = {
  type: SetType.working,
  status: SetStatusType.incomplete,
  reps: "",
  weight: "",
}

export const EMPTY_EXERCISE: FormExercise = {
  name: "",
  videoId: "",
  muscleGroups: [],
  equipment: { label: "", value: "" },
  type: { label: "", value: "" },
  bodyweightFactor: "100",
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
export const REGEX_INT_0_TO_100 = /^(?:100|[1-9]\d|\d)$/
