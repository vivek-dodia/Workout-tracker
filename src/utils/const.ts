import { sub } from "date-fns"
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
  DateOption,
  StringOption,
  GroupingOption,
  Grouping,
  NumberOption,
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

export const START_DATE_OPTIONS: DateOption[] = [
  { label: "1 Week", value: sub(new Date(), { weeks: 1 }) },
  { label: "2 Weeks", value: sub(new Date(), { weeks: 2 }) },
  { label: "1 Month", value: sub(new Date(), { months: 1 }) },
  { label: "3 Months", value: sub(new Date(), { months: 3 }) },
  { label: "6 Months", value: sub(new Date(), { months: 6 }) },
  { label: "1 Year", value: sub(new Date(), { years: 1 }) },
  { label: "All Time", value: new Date(-1, 0) },
]

export const EXERCISE_DATA_KEY_OPTIONS: StringOption[] = [
  { label: "Volume", value: "volume" },
  { label: "Heaviest Weight", value: "heaviestWeight" },
  { label: "One Rep Max", value: "orm" },
  { label: "Top Set Volume", value: "topSetVolume" },
  { label: "Total Reps", value: "totalReps" },
  { label: "Sets", value: "sets" },
]

export const CALCULATOR_OPTIONS: NumberOption[] = [
  { label: "One Rep Max", value: 0 },
  { label: "Warmup Sets (Main Lifts)", value: 1 },
]

export const OVERALL_DATA_KEY_OPTIONS: StringOption[] = [
  { label: "Volume", value: "volume" },
  { label: "Reps", value: "reps" },
  { label: "Sets", value: "sets" },
]

export const GROUPING_OPTIONS: GroupingOption[] = [
  { label: "Date", value: Grouping.byDate },
  { label: "Week", value: Grouping.byWeek },
  { label: "Month", value: Grouping.byMonth },
]

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
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
