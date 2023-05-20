import { useAppDispatch } from "."

import { useState } from "react"
import { initializeExercises } from "../reducers/exerciseReducer"
import { initializeWorkouts } from "../reducers/workoutReducer"

const useStateInitialization = () => {
  const dispatch = useAppDispatch()
  const [loadingExercises, setLoadingExercises] = useState<boolean>(true)
  const [loadingWorkouts, setLoadingWorkouts] = useState<boolean>(true)
  const loading: boolean = loadingExercises || loadingWorkouts 

  const initializeState = async (): Promise<void> => {
    const start: number = Date.now()

    await dispatch(initializeExercises())
    setLoadingExercises(false)

    await dispatch(initializeWorkouts())
    setLoadingWorkouts(false)

    console.log(`Initialization took: ${Date.now() - start}ms`)
  }

  return {initializeState, loading}
}

export default useStateInitialization
