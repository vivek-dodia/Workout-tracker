export type Credentials = {
  email: string
  password: string
}

export enum NotificationType {
  info = "info",
  success = "success",
  alert = "alert",
}

export type Notification = {
  message: string
  type: NotificationType
}

export interface Measurements {
  bodyweight: number
}

export interface User {
  id: string
  token: string
  username: string
  email: string
  measurements: Measurements
}

export enum ExerciseType {
  repsAndKg = "Reps&Kg",
  repsAndBw = "Reps&Bw",
  repsAndPlusKg = "Reps&+Kg",
  repsAndMinusKg = "Reps&-Kg",
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

export interface NumberOption {
  label: string
  value: number
}

export interface StringOption {
  label: string
  value: string
}

export interface DateOption {
  label: string
  value: Date
}

export interface MuscleGroupOption {
  label: string
  value: MuscleGroup
}

export interface EquipmentOption {
  label: string
  value: Equipment | ""
}

export interface ExerciseTypeOption {
  label: string
  value: ExerciseType | ""
}

export interface Exercise {
  id: string
  name: string
  user: string
  videoId?: string
  muscleGroups: MuscleGroup[]
  equipment: Equipment
  type: ExerciseType
  bodyweightFactor: number
}

export interface FormExercise {
  name: string
  videoId?: string
  muscleGroups: MuscleGroupOption[]
  equipment: EquipmentOption
  type: ExerciseTypeOption
  bodyweightFactor: string
}

export interface FormExerciseWithUser extends FormExercise {
  user: string
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
  actualWeight: number
}

export interface SetWithData extends Set {
  exerciseId: string
  date: string
  setIndex: number
  actualWeight: number
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
  name: string
  notes: string
  date: string
}

export interface Workout extends BaseWorkout {
  id: string
  user: string
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

export interface ExerciseSetRecord {
  reps: number
  weight: number
  volume: number
}

export interface ExerciseStats {
  totalSets: number
  totalReps: number
  totalVolume: number
  avgWorkoutSets: number
  avgWorkoutReps: number
  avgWorkoutVolume: number
  bestWorkoutVolume: number
  bestSetVolume: number
  heaviestWeight: number
  bestOrm: number
  setRecords: ExerciseSetRecord[]
}

export interface ExerciseGraphData {
  formattedDate: string
  orm: number
  date: string
  sets: number
  volume: number
  heaviestWeight: number
  topSetVolume: number
  totalReps: number
}

export interface OverallGraphData {
  formattedDate: string
  date: string
  sets: number
  volume: number
  reps: number
}

export enum Grouping {
  byDate = "byDate",
  byWeek = "byWeek",
  byMonth = "byMonth",
}

export interface GroupingOption {
  label: string
  value: Grouping
}
