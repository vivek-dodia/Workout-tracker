import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectWorkoutById } from "../selectors/workoutSelectors"
import NoWorkoutMatch from "./NoMatch/NoWorkoutMatch"
import Page from "../components/Layout/Page"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { Workout } from "../types"

const Details = ({ workout }: { workout: Workout }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setHeaderTitle(workout.name))
  }, [])

  return <Page>workout</Page>
}

const WorkoutDetails = () => {
  const { id } = useParams()
  const workout = useAppSelector((state) => selectWorkoutById(state, id || ""))

  if (!workout) return <NoWorkoutMatch />

  return <Details workout={workout} />
}

export default WorkoutDetails
