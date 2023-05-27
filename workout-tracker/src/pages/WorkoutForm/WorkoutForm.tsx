import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as types from "../../types"

import { EMPTY_WORKOUT, EMPTY_SET } from "../../utils/const"
import ExercisePicker from "./ExercisePicker"
import Page from "../../components/Layout/Page"
import GoBackButton from "../../components/GoBackButton"
import { ArrowDownIcon } from "@heroicons/react/24/outline"
import Button from "../../components/Button"

import { arrayMove, getWeight } from "../../utils/fn"

import { createWorkout, updateWorkout } from "../../reducers/workoutReducer"

import { selectUser } from "../../selectors/userSelectors"
import useFetchPreviousSet from "../../hooks/useFetchPreviousSet"
import WorkoutStats from "./WorkoutStats"
import { selectFormWorkoutById } from "../../selectors/workoutSelectors"
import Loading from "../../components/Loading"
import WorkoutFinish, { WorkoutFinishInputs } from "./WorkoutFinish"
import { setHeaderTitle } from "../../reducers/headerTitleReducer"

import Exercise from "./Exercise"
import Sets from "./Sets"
import Set from "./Set"
import useNotify from "../../hooks/useNotify"
import Spinner from "../../components/Spinner"

type WorkoutFormProps = {
  updating?: boolean
  duplicating?: boolean
}

const WorkoutForm = ({ updating, duplicating }: WorkoutFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const selectedWorkout = useAppSelector((state) =>
    selectFormWorkoutById(state, id || "")
  )
  const user = useAppSelector(selectUser)!
  const [startTime, setStartTime] = useState(Date.now())
  const { fetchPreviousSet } = useFetchPreviousSet()
  const { notify } = useNotify()
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [selectingExercises, setSelectingExercises] = useState(false)
  const [replacingExercise, setReplacingExercise] = useState({
    active: false,
    exerciseIndex: -1,
  })
  const [finishingWorkout, setFinishingWorkout] = useState(false)

  const [workout, setWorkout] = useState<types.FormWorkout>({
    ...EMPTY_WORKOUT,
    date: new Date().toISOString(),
  })

  useEffect(() => {
    resetState()
    if (selectedWorkout) {
      if (updating) {
        setWorkout({
          ...selectedWorkout,
          exercises: selectedWorkout.exercises.map((exercise) => ({
            ...exercise,
            sets: exercise.sets.map((set) => ({
              ...set,
              status: types.SetStatusType.complete,
            })),
          })),
        })
        setStartTime(
          Date.now() - parseInt(selectedWorkout.duration) * 60 * 1000
        )
      }

      if (duplicating) {
        setWorkout(selectedWorkout)
      }
    }
    setTimeout(() => setLoading(false), 0)
  }, [location])

  useEffect(() => {
    const title = selectingExercises
      ? "Add Exercises"
      : replacingExercise.active
      ? "Replace Exercise"
      : finishingWorkout
      ? "Save Workout"
      : updating
      ? "Edit Workout"
      : "Log Workout"
    dispatch(setHeaderTitle(title))
  }, [selectingExercises, finishingWorkout, replacingExercise, location])

  const resetState = () => {
    setWorkout({ ...EMPTY_WORKOUT, date: new Date().toISOString() })
    setStartTime(Date.now())
    setSelectingExercises(false)
    setFinishingWorkout(false)
    setReplacingExercise({ active: false, exerciseIndex: -1 })
    setLoading(true)
  }

  const addSelectedExercises = (
    selectedExercises: types.FormWorkoutExercise[]
  ) => {
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, ...selectedExercises],
    })
  }

  const replaceExercise = (exerciseIndex: number, exercise: types.Exercise) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          _exercise: exercise,
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const updateExercise = (
    exerciseIndex: number,
    newExercise: types.FormWorkoutExercise
  ) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...newExercise,
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const removeExercise = (exerciseIndex: number) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const moveExerciseUp = (exerciseIndex: number) => {
    setWorkout({
      ...workout,
      exercises: arrayMove(workout.exercises, exerciseIndex, exerciseIndex - 1),
    })
  }

  const moveExerciseDown = (exerciseIndex: number) => {
    setWorkout({
      ...workout,
      exercises: arrayMove(workout.exercises, exerciseIndex, exerciseIndex + 1),
    })
  }

  const addEmptySetForExercise = (exerciseIndex: number) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          sets: [...workout.exercises[exerciseIndex].sets, EMPTY_SET],
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const removeAllSetsForExercise = (exerciseIndex: number) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          sets: [],
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const updateAllSetsForExercise = (
    exerciseIndex: number,
    sets: types.FormSet[]
  ) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          sets,
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const moveSetUp = (exerciseIndex: number, setIndex: number) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          sets: arrayMove(
            workout.exercises[exerciseIndex].sets,
            setIndex,
            setIndex - 1
          ),
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const moveSetDown = (exerciseIndex: number, setIndex: number) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          sets: arrayMove(
            workout.exercises[exerciseIndex].sets,
            setIndex,
            setIndex + 1
          ),
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const duplicateSet = (exerciseIndex: number, setIndex: number) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          sets: [
            ...workout.exercises[exerciseIndex].sets.slice(0, setIndex),
            { ...workout.exercises[exerciseIndex].sets[setIndex] },
            ...workout.exercises[exerciseIndex].sets.slice(setIndex),
          ],
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          sets: [
            ...workout.exercises[exerciseIndex].sets.slice(0, setIndex),
            ...workout.exercises[exerciseIndex].sets.slice(setIndex + 1),
          ],
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    newSet: types.FormSet
  ) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, exerciseIndex),
        {
          ...workout.exercises[exerciseIndex],
          sets: [
            ...workout.exercises[exerciseIndex].sets.slice(0, setIndex),
            {
              ...newSet,
            },
            ...workout.exercises[exerciseIndex].sets.slice(setIndex + 1),
          ],
        },
        ...workout.exercises.slice(exerciseIndex + 1),
      ],
    })
  }

  const parseWorkout = (): Omit<types.Workout, "id" | "user"> => {
    const parseString = (value: string): number => {
      const parsed = parseFloat(value)
      return isNaN(parsed) ? 0 : parsed
    }

    return {
      ...workout,
      duration: parseString(workout.duration),
      exercises: workout.exercises.map((exercise) => {
        return {
          ...exercise,
          sets: exercise.sets.map((set) => ({
            type: set.type,
            reps: parseString(set.reps),
            weight: parseString(set.weight),
            actualWeight: getWeight(
              exercise._exercise.type,
              exercise._exercise.bodyweightFactor,
              parseString(set.weight)
            ),
          })),
        }
      }),
    }
  }

  const markErrorSets = () => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.map((exercise) => ({
          ...exercise,
          sets: exercise.sets.map((set) => ({
            ...set,
            status:
              !set.reps || !set.weight ? types.SetStatusType.error : set.status,
          })),
        })),
      ],
    })
  }

  const isValidWorkoutForFinish = () => {
    if (workout.exercises.length === 0 || !workout.exercises) {
      console.log("Entry must have some exercises!", "alert")
      return false
    }

    const sets = workout.exercises.map((exercise) => exercise.sets).flat()
    const hasValidRepsAndWeight = sets.every(
      (set) => !!set.reps && !!set.weight
    )

    if (!hasValidRepsAndWeight) {
      console.log("Please fill all reps and weights")
      markErrorSets()
      return false
    }

    return true
  }

  const isValidWorkoutForSubmit = () => {
    if (!workout.name) {
      console.log("Workout must have a name")
      return false
    }
    if (!workout.duration) {
      console.log("Workout must have a duration")
      return false
    }
    if (!workout.date) {
      console.log("Workout must have a date")
      return false
    }
    return true
  }

  const finishWorkout = () => {
    if (!isValidWorkoutForFinish()) return
    const durationMs = Date.now() - startTime
    const durationMin = Math.ceil(durationMs / 60000)
    setWorkout({ ...workout, duration: durationMin.toString() })
    setFinishingWorkout(true)
  }

  const submitWorkout = () => {
    if (!isValidWorkoutForFinish() || !isValidWorkoutForSubmit()) return
    const newWorkout = parseWorkout()

    if (updating && selectedWorkout && id && user) {
      setButtonLoading(true)
      dispatch(updateWorkout({ id, user: user.id, ...newWorkout }))
        .then(({ id }) => navigate(`/app/workouts/${id}`))
        .catch(() => {
          notify("Something went wrong", types.NotificationType.alert)
        })
        .finally(() => setButtonLoading(false))
    } else {
      setButtonLoading(true)
      dispatch(createWorkout(newWorkout))
        .then(({ id }) => navigate(`/app/workouts/${id}`))
        .catch(() => {
          notify("Something went wrong", types.NotificationType.alert)
        })
        .finally(() => setButtonLoading(false))
    }
  }

  if ((updating || duplicating) && !selectedWorkout)
    return <div>No workout found</div>

  if (loading) return <Loading />

  if (selectingExercises || replacingExercise.active)
    return (
      <ExercisePicker
        setSelectingExercises={setSelectingExercises}
        replacingExercise={replacingExercise}
        setReplacingExercise={setReplacingExercise}
        onReplace={replaceExercise}
        onSelection={addSelectedExercises}
      />
    )

  if (finishingWorkout)
    return (
      <WorkoutFinish
        buttonLoading={buttonLoading}
        workout={workout}
        setWorkout={setWorkout}
        setFinishingWorkout={setFinishingWorkout}
        submitWorkout={submitWorkout}
      />
    )

  return (
    <Page>
      <Page.Header>
        <div className="py-4 container px-6 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <GoBackButton to="/app/workouts">Workouts</GoBackButton>
            </div>

            <WorkoutStats
              workout={workout}
              startTime={updating ? undefined : startTime}
            />

            <div>
              {updating ? (
                <Button variant="success" onClick={submitWorkout}>
                  <div className="flex gap-2 items-center">
                    {buttonLoading && <Spinner />}
                    <h3>Update Workout</h3>
                  </div>
                </Button>
              ) : (
                <Button variant="tertiary" onClick={finishWorkout}>
                  Finish Workout
                </Button>
              )}
            </div>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        <div>
          {updating && (
            <div className="mt-8">
              <WorkoutFinishInputs workout={workout} setWorkout={setWorkout} />
            </div>
          )}

          <div className="space-y-4 mt-8">
            {workout.exercises.map((workoutExercise, exerciseIndex) => (
              <div
                key={exerciseIndex}
                className="bg-white px-4 py-6 rounded-lg shadow-md"
              >
                <Exercise
                  workoutExercise={workoutExercise}
                  user={user}
                  exerciseIndex={exerciseIndex}
                  exerciseCount={workout.exercises.length}
                  moveExerciseUp={moveExerciseUp}
                  moveExerciseDown={moveExerciseDown}
                  removeExercise={removeExercise}
                  addEmptySetForExercise={addEmptySetForExercise}
                  duplicateSet={duplicateSet}
                  setReplacingExercise={setReplacingExercise}
                  updateExercise={updateExercise}
                />

                <Sets
                  exerciseIndex={exerciseIndex}
                  sets={workoutExercise.sets}
                  exerciseId={workoutExercise._exercise.id}
                  exerciseType={workoutExercise._exercise.type}
                  addEmptySetForExercise={addEmptySetForExercise}
                  duplicateSet={duplicateSet}
                  removeAllSetsForExercise={removeAllSetsForExercise}
                  updateAllSetsForExercise={updateAllSetsForExercise}
                  fetchPreviousSet={fetchPreviousSet}
                >
                  {workoutExercise.sets.map((set, setIndex) => (
                    <div key={setIndex}>
                      <Set
                        set={set}
                        setIndex={setIndex}
                        exerciseIndex={exerciseIndex}
                        exerciseType={workoutExercise._exercise.type}
                        setCount={workoutExercise.sets.length}
                        exerciseId={workoutExercise._exercise.id}
                        moveSetUp={moveSetUp}
                        moveSetDown={moveSetDown}
                        duplicateSet={duplicateSet}
                        removeSet={removeSet}
                        updateSet={updateSet}
                        fetchPreviousSet={fetchPreviousSet}
                      />
                    </div>
                  ))}
                </Sets>
              </div>
            ))}
          </div>

          {workout.exercises.length <= 0 && (
            <div className="flex flex-col items-center py-6 gap-4">
              <p className="text-lg font-semibold text-center">
                Start by adding some exercises to your workout
              </p>
              <ArrowDownIcon className="h-6 w-6 animate-bounce" />
              <Button onClick={() => setSelectingExercises(true)}>
                Add Exercises
              </Button>
            </div>
          )}

          {workout.exercises.length > 0 && (
            <div className="grid grid-cols-4 py-12 gap-4">
              <div className="col-start-2 col-span-2 flex gap-4">
                <Button
                  className="flex-1"
                  onClick={() => setSelectingExercises(true)}
                >
                  Add exercises
                </Button>

                <Button
                  className="flex-1"
                  variant="alert"
                  onClick={() => setWorkout({ ...workout, exercises: [] })}
                >
                  Clear exercises
                </Button>
              </div>
              {/* <div className="col-start-2 col-span-2 flex gap-4">
                <Button
                  className="flex-1"
                  variant="neutral"
                  onClick={() => console.log("Settings")}
                >
                  Settings
                </Button>
              </div> */}
            </div>
          )}
        </div>
      </Page.Content>
    </Page>
  )
}

export default WorkoutForm
