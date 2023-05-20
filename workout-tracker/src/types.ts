export type Credentials = {
  email: string
  password: string
}

export type Notification = {
  message: string
  type: string
}

export interface User {
  id: string
  token: string
  username: string
  email: string
}

export enum ExerciseType {
  repsAndKg = "Reps&Kg",
  bwReps = "Reps",
  weightedBw = "Reps&+Kg",
  assistedBw = "Reps&-Kg",
  duration = "Time",
  distanceAndDuration = "Time&Km",
  weightAndDistance = "Kg&Km",
}

export enum Equipment {
  barbell = "Barbell",
  dumbbell = "Dumbbell",
  kettlebell = "Kettlebell",
  machine = "Machine",
  plate = "Plate",
  band = "Band",
  none = "None",
  other = "Other",
}

export enum MuscleGroup {
  chest = "Chest",
  delts = "Delts",
  quads = "Quads",
  glutes = "Glutes",
  hamstrings = "Hamstrings",
  upperBack = "Upper Back",
  lats = "Lats",
  biceps = "Biceps",
  triceps = "Triceps",
  calves = "Calves",
  abs = "Abs",
}

export interface Exercise {
  id: string
  name: string
  user: string
  videoId?: string
  orm: number
  muscleGroups: MuscleGroup[]
  equipment: Equipment
  type: ExerciseType
}

export enum SetType {
  warmup = "Warmup",
  working = "Working",
  amrap = "AMRAP",
}

export enum SetStatusType {
  incomplete = "incomplete",
  complete = "complete",
  error = "error",
}

export interface Set {
  type: SetType
  reps: number
  weight: number
}

export interface FormSet {
  status: SetStatusType
  type: SetType
  reps: string
  weight: string
}

export interface BaseWorkoutExercise {
  _exercise: Exercise
  notes: string
}

export interface WorkoutExercise extends BaseWorkoutExercise {
  sets: Set[]
}

export interface FormWorkoutExercise extends BaseWorkoutExercise {
  sets: FormSet[]
}

export interface BaseWorkout {
  id: string
  name: string
  user: string
  notes: string
  date: string
}

export interface Workout extends BaseWorkout {
  duration: number
  exercises: WorkoutExercise[]
}

export interface FormWorkout extends BaseWorkout {
  duration: string
  exercises: FormWorkoutExercise[]
}

export interface SortOption {
  label: string
  sortKey: string
  sortDirection: string
  isDate: boolean
}

type IconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
  React.RefAttributes<SVGSVGElement>
type IconProps = IconSVGProps & {
  title?: string
  titleId?: string
}

export type HeroIcon = React.FC<IconProps>
