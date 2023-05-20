import { useEffect, useState, Dispatch } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"

import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { selectExercisesByQuery } from "../selectors/exerciseSelectors"

import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"

import Page from "../components/Layout/Page"
import SearchBar from "../components/SearchBar"
import { selectUser } from "../selectors/userSelectors"
import { Exercise, FormWorkoutExercise } from "../types"
import { classNames } from "../utils/fn"
import Button from "../components/Button"

export const CustomChip = () => {
  return (
    <div className="border px-1 py-0.5 rounded-md bg-blue-100">
      <div>
        <p className="text-sm text-blue-600">Custom</p>
      </div>
    </div>
  )
}

type ExerciseListItemProps = {
  exercise: Exercise
  picking?: boolean
  isSelected?: boolean
}

export const ExerciseListItem = ({
  exercise,
  picking,
  isSelected,
}: ExerciseListItemProps) => {
  const user = useAppSelector(selectUser)
  return (
    <>
      <div className="flex gap-x-4 py-1">
        <div
          className={classNames(
            "relative inline-flex items-center justify-center w-12 h-12 overflow-hidden group-hover:bg-blue-500 rounded-full dark:bg-gray-600",
            isSelected ? "bg-blue-500" : "bg:gray-100"
          )}
        >
          <span
            className={classNames(
              "font-medium dark:text-gray-300 group-hover:text-white",
              isSelected ? "text-white" : "text-gray-600"
            )}
          >
            {exercise.name[0]}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-semibold text-gray-800 group-hover:text-black">
            {exercise.name}
          </p>
          <div className="mt-1 flex gap-4 items-center">
            <p className="text-sm text-gray-500 group-hover:text-gray-600">
              {exercise.muscleGroups.join(", ")}
            </p>
            {exercise.user === user?.id && <CustomChip />}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        {picking && isSelected && (
          <CheckIcon className="h-6 w-6 text-blue-500" />
        )}
        {!picking && (
          <ChevronRightIcon className="h-6 w-6 group-hover:text-blue-500" />
        )}
      </div>
    </>
  )
}

type Props = {
  asPicker?: {
    onSelection: (selectedExercises: FormWorkoutExercise[]) => void
    setSelectingExercises: Dispatch<boolean>
    selectExercises?: () => void
    toggleSelected: (exercise: Exercise) => void
    isSelected: (exercise: Exercise) => boolean
    selectedCount: number
  }
}

const Exercises = ({ asPicker }: Props) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const user = useAppSelector(selectUser)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const exercises = useAppSelector((state) =>
    selectExercisesByQuery(state, searchQuery)
  )
  const customExercises = exercises.filter(
    (exercise) => exercise.user === user?.id
  )

  useEffect(() => {
    dispatch(setHeaderTitle("Exercises"))
  }, [location])

  const CustomExercises = () => (
    <>
      <label className="text-gray-500 text-sm">Custom Exercises</label>
      <ul className="mt-1 divide-y divide-gray-200">
        {customExercises.map((exercise) => {
          if (asPicker) {
            return (
              <div
                key={exercise.id}
                className="flex justify-between gap-x-6 py-5 group items-center cursor-pointer"
                onClick={() => asPicker.toggleSelected(exercise)}
              >
                <ExerciseListItem
                  picking
                  exercise={exercise}
                  isSelected={asPicker.isSelected(exercise)}
                />
              </div>
            )
          }
          return (
            <Link
              key={exercise.id}
              to={`/app/exercises/${exercise.id}`}
              className="flex justify-between gap-x-6 py-5 group items-center"
            >
              <ExerciseListItem exercise={exercise} />
            </Link>
          )
        })}
      </ul>
    </>
  )

  const AllExercises = () => (
    <>
      <label className="text-gray-500 text-sm">All Exercises</label>
      <ul className="mt-1 divide-y divide-gray-200">
        {exercises.map((exercise) => {
          if (asPicker) {
            return (
              <div
                key={exercise.id}
                className="flex justify-between gap-x-6 py-5 group items-center cursor-pointer"
                onClick={() => asPicker.toggleSelected(exercise)}
              >
                <ExerciseListItem
                  picking
                  exercise={exercise}
                  isSelected={asPicker.isSelected(exercise)}
                />
              </div>
            )
          }
          return (
            <Link
              key={exercise.id}
              to={`/app/exercises/${exercise.id}`}
              className="flex justify-between gap-x-6 py-5 group items-center"
            >
              <ExerciseListItem exercise={exercise} />
            </Link>
          )
        })}
      </ul>
    </>
  )

  const NoExercises = () => (
    <>
      <div>No Exercises Found</div>
    </>
  )

  return (
    <Page>
      <Page.Header>
        <div className="py-4 container px-6 mx-auto">
          <div className="flex flex-col gap-4">
            {!!asPicker && (
              <div className="flex justify-between">
                <button
                  className="flex gap-2 items-center"
                  onClick={() => asPicker.setSelectingExercises(false)}
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <h4 className="font-semibold text-gray-600">Workout</h4>
                </button>
                <Button variant="secondary" onClick={asPicker.selectExercises}>
                  {`Add selected exercises (${asPicker.selectedCount})`}
                </Button>
              </div>
            )}
            <div className="grid grid-cols-9 gap-4 items-center">
              <SearchBar
                className={!asPicker ? "col-span-8" : "col-span-full"}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search exercises..."
              />
              {!asPicker && (
                <Link
                  to="/app/exercises/new"
                  className="bg-green-500 hover:bg-green-700 rounded-md p-2 text-white flex items-center justify-center"
                >
                  <h3>Add Exercise</h3>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        {!!customExercises.length && <CustomExercises />}
        {!!exercises.length && <AllExercises />}
        {!exercises.length && <NoExercises />}
      </Page.Content>
    </Page>
  )
}

export default Exercises
