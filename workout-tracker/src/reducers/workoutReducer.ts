import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import workoutService from "../services/workouts"

import { Exercise, NotificationType, Workout } from "../types"
import { setNotification } from "./notificationReducer"
import { AppDispatch } from "../store"

export type WorkoutsState = Workout[]

const initialState = [] as WorkoutsState

export const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    _initializeWorkouts(
      _,
      { payload }: PayloadAction<Workout[]>
    ): WorkoutsState {
      return payload
    },
    _createWorkout(state, { payload }: PayloadAction<Workout>): WorkoutsState {
      return state.concat(payload)
    },
    _updateWorkout(state, { payload }: PayloadAction<Workout>): WorkoutsState {
      return state.map((workout) =>
        workout.id === payload.id ? payload : workout
      )
    },
    _removeWorkout(state, { payload }: PayloadAction<string>): WorkoutsState {
      return state.filter((workout) => workout.id !== payload)
    },
    _removeExerciseFromWorkouts(
      state,
      { payload }: PayloadAction<string>
    ): WorkoutsState {
      return state
        .map((workout) => ({
          ...workout,
          exercises: workout.exercises.filter(
            (exercise) => exercise._exercise.id !== payload
          ),
        }))
        .filter((workout) => workout.exercises.length)
    },
    _updateExerciseForWorkouts(
      state,
      { payload }: PayloadAction<Exercise>
    ): WorkoutsState {
      return state.map((workout) => ({
        ...workout,
        exercises: workout.exercises.map((exercise) => ({
          ...exercise,
          _exercise:
            payload.id === exercise._exercise.id ? payload : exercise._exercise,
        })),
      }))
    },
  },
})

const {
  _initializeWorkouts,
  _createWorkout,
  _updateWorkout,
  _removeWorkout,
  _removeExerciseFromWorkouts,
  _updateExerciseForWorkouts,
} = workoutSlice.actions

// ACTIONS

export const initializeWorkouts = () => {
  return async (dispatch: AppDispatch): Promise<Workout[]> => {
    const workouts = await workoutService.getAll()
    const formattedWorkouts = workouts.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          ...set,
          weight: +set.weight.toFixed(2),
          actualWeight: +set.actualWeight.toFixed(2),
        })),
      })),
    }))

    dispatch(_initializeWorkouts(formattedWorkouts))
    return workouts
  }
}

export const refetchWorkouts = () => initializeWorkouts()

export const createWorkout = (
  workoutToCreate: Omit<Workout, "id" | "user">
) => {
  return async (dispatch: AppDispatch): Promise<Workout> => {
    const newWorkout = await workoutService.create(workoutToCreate)
    dispatch(_createWorkout(newWorkout))
    dispatch(
      setNotification({
        message: `Created workout: ${newWorkout.name}`,
        type: NotificationType.success,
      })
    )
    return newWorkout
  }
}

export const updateWorkout = (workoutToUpdate: Workout) => {
  return async (dispatch: AppDispatch): Promise<Workout> => {
    const updatedWorkout = await workoutService.update(
      workoutToUpdate.id,
      workoutToUpdate
    )
    dispatch(_updateWorkout(updatedWorkout))
    dispatch(
      setNotification({
        message: `Updated workout: ${updatedWorkout.name}`,
        type: NotificationType.success,
      })
    )
    return updatedWorkout
  }
}

export const removeWorkout = (id: string) => {
  return async (dispatch: AppDispatch): Promise<Workout> => {
    const removedWorkout = await workoutService.remove(id)
    dispatch(_removeWorkout(id))
    dispatch(
      setNotification({
        message: `Deleted workout: ${removedWorkout.name}`,
        type: NotificationType.success,
      })
    )
    return removedWorkout
  }
}

export const removeExerciseFromWorkouts = (id: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(_removeExerciseFromWorkouts(id))
  }
}

export const updateExerciseForWorkouts = (exercise: Exercise) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(_updateExerciseForWorkouts(exercise))
  }
}

export default workoutSlice.reducer
