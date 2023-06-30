import { useAppDispatch } from "."
import { useState } from "react"
import { initializeExercises } from "../reducers/exerciseReducer"
import { initializeWorkouts } from "../reducers/workoutReducer"

const useStateInitialization = () => {
  const dispatch = useAppDispatch()
  const [loadingExercises, setLoadingExercises] = useState<boolean>(true)
  const [loadingWorkouts, setLoadingWorkouts] = useState<boolean>(true)
  const loading: boolean = loadingExercises || loadingWorkouts
  const loadingText = loadingExercises ? "Loading Exercises" : loadingWorkouts ? "Loading Workouts" : "Loading"

  const initializeState = async (): Promise<void> => {


    await dispatch(initializeExercises())
    setLoadingExercises(false)

    await dispatch(initializeWorkouts())
    setLoadingWorkouts(false)


  }

  return {initializeState, loading, loadingText}
}

export default useStateInitialization
