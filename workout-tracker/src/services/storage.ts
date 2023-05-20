import { User, Workout } from "../types"

const USER_KEY = "user"
const WORKOUT_KEY = "workout"

const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

const loadUser = (): User | null => {
  const userJson = window.localStorage.getItem(USER_KEY)
  if (!userJson) return null
  const user: User = JSON.parse(userJson)
  return user
}

const removeUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

const removeWorkout = (): void => {
  localStorage.removeItem(WORKOUT_KEY)
}

const saveWorkout = (workout: Omit<Workout, "id" | "user">): void => {
  localStorage.setItem(WORKOUT_KEY, JSON.stringify(workout))
}

const loadWorkout = (): Omit<Workout, "id" | "user"> | null => {
  const workoutJson = window.localStorage.getItem(WORKOUT_KEY)
  if (!workoutJson) return null
  const workout: Omit<Workout, "id" | "user"> = JSON.parse(workoutJson)
  return workout
}



export default {
  saveUser,
  loadUser,
  removeUser,
  saveWorkout,
  loadWorkout,
  removeWorkout
}
