import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as types from "../types"

import { EMPTY_WORKOUT, EMPTY_SET, REGEX_DECIMAL } from "../utils/const"
import ExercisePicker from "../components/ExercisePicker"
import Page from "../components/Layout/Page"
import GoBackButton from "../components/GoBackButton"
import { ArrowDownIcon, CheckIcon } from "@heroicons/react/24/outline"
import Button from "../components/Button"
import Dropdown from "../components/Dropdown"
import DropdownSection from "../components/Dropdown/DropdownSection"
import MoveUpOption from "../components/Dropdown/MoveUpOption"
import MoveDownOption from "../components/Dropdown/MoveDownOption"
import DeleteOption from "../components/Dropdown/DeleteOption"
import { arrayMove, classNames } from "../utils/fn"
import AddOption from "../components/Dropdown/AddOption"
import DuplicateOption from "../components/Dropdown/DuplicateOption"
import { createWorkout } from "../reducers/workoutReducer"
import Tooltip from "../components/Tooltip"
import { CustomChip } from "./Exercises"
import { selectUser } from "../selectors/userSelectors"

type SetProps = {
  set: types.FormSet
  exerciseIndex: number
  setIndex: number
  setCount: number
  moveSetUp: (exerciseIndex: number, setIndex: number) => void
  moveSetDown: (exerciseIndex: number, setIndex: number) => void
  duplicateSet: (exerciseIndex: number, setIndex: number) => void
  removeSet: (exerciseIndex: number, setIndex: number) => void
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    newSet: types.FormSet
  ) => void
}

const Set = ({
  set,
  setIndex,
  exerciseIndex,
  setCount,
  moveSetUp,
  moveSetDown,
  duplicateSet,
  removeSet,
  updateSet,
}: SetProps) => {
  const toggleType = () => {
    const { warmup, working, amrap } = types.SetType
    const type =
      set.type === working ? warmup : set.type === warmup ? amrap : working
    updateSet(exerciseIndex, setIndex, { ...set, type })
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className={classNames(
          "flex-1 grid grid-cols-12 text-xs",
          set.status === types.SetStatusType.complete
            ? "bg-green-500 text-white"
            : set.status === types.SetStatusType.error
            ? "bg-red-500 text-white"
            : "bg-inherit"
        )}
      >
        <div className="items-center justify-center p-1 grid h-12 w-full col-span-1">
          {setIndex + 1}
        </div>
        <div className="p-1 grid h-12 w-full col-span-3">
          <button className="flex-1" onClick={toggleType}>
            {set.type}
          </button>
        </div>
        <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
          Previous
        </div>
        <div className="items-center justify-center p-1 grid h-12 w-full col-span-2">
          <input
            className="w-full h-full bg-inherit px-2 text-center outline-none"
            value={set.reps}
            placeholder={"Previous reps"}
            onChange={({ target }) =>
              updateSet(exerciseIndex, setIndex, {
                ...set,
                status: types.SetStatusType.incomplete,
                reps:
                  REGEX_DECIMAL.test(target.value) || target.value === ""
                    ? target.value
                    : set.reps,
              })
            }
          />
        </div>
        <div className="items-center justify-center p-1 grid h-12 w-full col-span-2">
          <input
            className="w-full h-full bg-inherit px-2 text-center outline-none"
            value={set.weight}
            placeholder={"Previous weight"}
            onChange={({ target }) =>
              updateSet(exerciseIndex, setIndex, {
                ...set,
                status: types.SetStatusType.incomplete,
                weight:
                  REGEX_DECIMAL.test(target.value) || target.value === ""
                    ? target.value
                    : set.weight,
              })
            }
          />
        </div>
        <div className="items-center justify-center p-1 grid h-12 w-full col-span-1">
          <CheckIcon
            className={classNames(
              "h-5 w-5 cursor-pointer",
              set.status === types.SetStatusType.incomplete
                ? "text-gray-500"
                : "text-white"
            )}
            onClick={() =>
              updateSet(exerciseIndex, setIndex, {
                ...set,
                reps: set.reps || "0",
                weight: set.weight || "0",
                status:
                  set.status === types.SetStatusType.complete
                    ? types.SetStatusType.incomplete
                    : types.SetStatusType.complete,
              })
            }
          />
        </div>
      </div>

      <div>
        <Dropdown>
          <DropdownSection>
            <MoveUpOption
              title="Move Set Up"
              onClick={() => moveSetUp(exerciseIndex, setIndex)}
              disabled={setIndex === 0}
            />
            <MoveDownOption
              title="Move Set Down"
              onClick={() => moveSetDown(exerciseIndex, setIndex)}
              disabled={setIndex === setCount - 1}
            />
          </DropdownSection>
          <DropdownSection>
            <DuplicateOption
              title="Duplicate Set"
              onClick={() => duplicateSet(exerciseIndex, setIndex)}
            />
          </DropdownSection>
          <DropdownSection>
            <DeleteOption
              title="Remove Set"
              onClick={() => removeSet(exerciseIndex, setIndex)}
            />
          </DropdownSection>
        </Dropdown>
      </div>
    </div>
  )
}

type SetsProps = {
  children: React.ReactNode
  exerciseIndex: number
  sets: types.FormSet[]
  addEmptySetForExercise: (exerciseIndex: number) => void
  removeAllSetsForExercise: (exerciseIndex: number) => void
  updateAllSetsForExercise: (
    exerciseIndex: number,
    sets: types.FormSet[]
  ) => void
}

const Sets = ({
  children,
  exerciseIndex,
  sets,
  addEmptySetForExercise,
  removeAllSetsForExercise,
  updateAllSetsForExercise,
}: SetsProps) => {
  return (
    <>
      {/* TABLE */}
      <div className="mt-8">
        {/* TABLE HEADER */}
        <div className="flex items-center gap-4">
          <div className="flex-1 grid grid-cols-12 text-xs font-semibold">
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-1">
              Set
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              Type
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              Previous
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-2">
              Reps
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-2">
              Weight
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-1">
              <Tooltip text="Mark all sets done">
                <CheckIcon
                  className={classNames(
                    "h-5 w-5 cursor-pointer",
                    sets.every(
                      (set) => set.status === types.SetStatusType.complete
                    )
                      ? "text-green-500"
                      : "text-gray-500"
                  )}
                  onClick={() =>
                    updateAllSetsForExercise(
                      exerciseIndex,
                      sets.map((set) => ({
                        ...set,
                        reps: set.reps || "0",
                        weight: set.weight || "0",
                        status: types.SetStatusType.complete,
                      }))
                    )
                  }
                />
              </Tooltip>
            </div>
          </div>

          <div>
            <Dropdown>
              <DropdownSection>
                <AddOption
                  title="Add empty set"
                  onClick={() => addEmptySetForExercise(exerciseIndex)}
                />
              </DropdownSection>
              <DropdownSection>
                <DeleteOption
                  title="Remove all sets"
                  onClick={() => removeAllSetsForExercise(exerciseIndex)}
                />
              </DropdownSection>
            </Dropdown>
          </div>
        </div>

        {children}
      </div>
    </>
  )
}

type ExerciseProps = {
  exercise: types.Exercise
  user: types.User | null
  exerciseIndex: number
  exerciseCount: number
  moveExerciseUp: (exerciseIndex: number) => void
  moveExerciseDown: (exerciseIndex: number) => void
  removeExercise: (exerciseIndex: number) => void
}

const Exercise = ({
  exercise,
  user,
  exerciseIndex,
  exerciseCount,
  moveExerciseUp,
  moveExerciseDown,
  removeExercise,
}: ExerciseProps) => {
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 py-1">
            <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-blue-500 rounded-full dark:bg-gray-600">
              <span className="font-medium dark:text-gray-300 text-white">
                {exercise.name[0]}
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-semibold">{exercise.name}</p>
              <div className="mt-1 flex gap-4 items-center">
                <p className="text-sm text-gray-600">
                  {exercise.muscleGroups.join(", ")}
                </p>
                {exercise.user === user?.id && <CustomChip />}
              </div>
            </div>
          </div>

          <Dropdown>
            <DropdownSection>
              <MoveUpOption
                title="Move Exercise Up"
                onClick={() => moveExerciseUp(exerciseIndex)}
                disabled={exerciseIndex === 0}
              />
              <MoveDownOption
                title="Move Exercise Down"
                onClick={() => moveExerciseDown(exerciseIndex)}
                disabled={exerciseIndex === exerciseCount - 1}
              />
            </DropdownSection>
            <DropdownSection>
              <DeleteOption
                title="Remove Exercise"
                onClick={() => removeExercise(exerciseIndex)}
              />
            </DropdownSection>
          </Dropdown>
        </div>
      </div>
    </>
  )
}

type WorkoutFormProps = {
  updating?: boolean
  duplicating?: boolean
}

const WorkoutForm = ({ updating, duplicating }: WorkoutFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const user = useAppSelector(selectUser)
  const [selectingExercises, setSelectingExercises] = useState(false)
  const [finishingEntry, setFinishingEntry] = useState(false)

  const [workout, setWorkout] =
    useState<Omit<types.FormWorkout, "id" | "user">>(EMPTY_WORKOUT)

  const resetState = () => {
    setWorkout(EMPTY_WORKOUT)
    setSelectingExercises(false)
    setFinishingEntry(false)
  }

  const addSelectedExercises = (
    selectedExercises: types.FormWorkoutExercise[]
  ) => {
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, ...selectedExercises],
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
          })),
        }
      }),
    }
  }

  const markAllSetsComplete = () => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises.map((exercise) => ({
          ...exercise,
          sets: exercise.sets.map((set) => ({
            ...set,
            status: types.SetStatusType.complete,
          })),
        })),
      ],
    })
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
    const hasAllSetsCompleted = sets.every(
      (set) => set.status === types.SetStatusType.complete
    )

    if (!hasValidRepsAndWeight) {
      console.log("Please fill all reps and weights")
      markErrorSets()
      return false
    }

    if (!hasAllSetsCompleted) {
      console.log("Autocompleting sets")
      markAllSetsComplete()
      return false
    }

    return true
  }

  const submitWorkout = () => {
    if (!isValidWorkoutForFinish()) return
    const newWorkout = parseWorkout()
    dispatch(createWorkout(newWorkout))
  }

  if (selectingExercises)
    return (
      <ExercisePicker
        setSelectingExercises={setSelectingExercises}
        onSelection={addSelectedExercises}
      />
    )

  return (
    <Page>
      <Page.Header>
        <div className="py-4 container px-6 mx-auto">
          <div className="flex justify-between">
            <div>
              <GoBackButton to="/app/workouts">Workouts</GoBackButton>
            </div>
            <div>
              <Button variant="tertiary" onClick={submitWorkout}>
                Finish Workout
              </Button>
            </div>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        <div className="space-y-4">
          {workout.exercises.map(({ _exercise, sets }, exerciseIndex) => (
            <div
              key={exerciseIndex}
              className="bg-white px-4 py-6 rounded-lg shadow-md"
            >
              <Exercise
                exercise={_exercise}
                user={user}
                exerciseIndex={exerciseIndex}
                exerciseCount={workout.exercises.length}
                moveExerciseUp={moveExerciseUp}
                moveExerciseDown={moveExerciseDown}
                removeExercise={removeExercise}
              />

              <Sets
                exerciseIndex={exerciseIndex}
                sets={sets}
                addEmptySetForExercise={addEmptySetForExercise}
                removeAllSetsForExercise={removeAllSetsForExercise}
                updateAllSetsForExercise={updateAllSetsForExercise}
              >
                {sets.map((set, setIndex) => (
                  <div key={setIndex}>
                    <Set
                      set={set}
                      setIndex={setIndex}
                      exerciseIndex={exerciseIndex}
                      setCount={sets.length}
                      moveSetUp={moveSetUp}
                      moveSetDown={moveSetDown}
                      duplicateSet={duplicateSet}
                      removeSet={removeSet}
                      updateSet={updateSet}
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
            <div className="col-start-2 col-span-2 flex gap-4">
              <Button
                className="flex-1"
                variant="neutral"
                onClick={() => console.log("Settings")}
              >
                Settings
              </Button>
            </div>
          </div>
        )}
      </Page.Content>
    </Page>
  )
}

export default WorkoutForm
