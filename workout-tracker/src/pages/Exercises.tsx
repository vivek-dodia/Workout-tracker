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
import { useInView } from "react-intersection-observer"
import LinkButton from "../components/LinkButton"

export const CustomChip = () => {
  return (
    <div className="border px-1 py-0.5 rounded-md bg-blue-100">
      <div>
        <p className="text-xs text-blue-600">Custom</p>
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
      <div className="flex gap-x-4 py-1 items-center">
        <div>
          <div
            className={classNames(
              "relative inline-flex items-center justify-center w-12 h-12 overflow-hidden group-hover:bg-blue-500 rounded-full dark:bg-gray-600",
              isSelected ? "bg-blue-500" : "bg-gray-100"
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
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-gray-800 group-hover:text-black">
              {exercise.name}
            </p>
            {exercise.user === user?.id && <CustomChip />}
          </div>
          <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
            {exercise.muscleGroups.join(", ")}
          </p>
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
    replaceExercise: (exerciseIndex: number, exercise: Exercise) => void
    setReplacingExercise: Dispatch<{ active: boolean; exerciseIndex: number }>
    replacingExercise: {
      active: boolean
      exerciseIndex: number
    } 
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

  const [page, setPage] = useState(1)
  const pageIncrease = 5
  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView) {
        setPage(page + 1)
      }
    },
  })

  useEffect(() => {
    dispatch(setHeaderTitle("Exercises"))
  }, [location])

  const CustomExercises = () => (
    <>
      <label className="text-gray-500 text-sm">
        Custom Exercises ({customExercises.length})
      </label>
      <ul className="mt-1 divide-y divide-gray-200">
        {customExercises.map((exercise) => {
          if (asPicker) {
            return (
              <div
                key={exercise.id}
                className="flex justify-between gap-x-6 py-5 group items-center cursor-pointer"
                onClick={() => {
                  asPicker.replacingExercise.active
                    ? asPicker.replaceExercise(
                        asPicker.replacingExercise.exerciseIndex,
                        exercise
                      )
                    : asPicker.toggleSelected(exercise)
                }}
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
      <label className="text-gray-500 text-sm">
        All Exercises ({exercises.length})
      </label>
      <ul className="mt-1 divide-y divide-gray-200">
        {exercises.slice(0, page * pageIncrease).map((exercise) => {
          if (asPicker) {
            return (
              <div
                key={exercise.id}
                className="flex justify-between gap-x-6 py-5 group items-center cursor-pointer"
                onClick={() => {
                  asPicker.replacingExercise.active
                    ? asPicker.replaceExercise(
                        asPicker.replacingExercise.exerciseIndex,
                        exercise
                      )
                    : asPicker.toggleSelected(exercise)
                }}
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
                  onClick={() => {
                    asPicker.replacingExercise.active
                      ? asPicker.setReplacingExercise({
                          active: false,
                          exerciseIndex: -1,
                        })
                      : asPicker.setSelectingExercises(false)
                  }}
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <h4 className="font-semibold text-gray-600">Workout</h4>
                </button>
                {!asPicker.replacingExercise.active && (
                  <Button
                    variant="secondary"
                    onClick={asPicker.selectExercises}
                  >
                    {`Add selected exercises (${asPicker.selectedCount})`}
                  </Button>
                )}
              </div>
            )}
            <div className="flex-col sm:flex-row flex gap-4 items-center">
              <SearchBar
                className="flex-1"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search exercises..."
              />
              {!asPicker && (
                <LinkButton variant="success" to="/app/exercises/new">
                  Add Exercise
                </LinkButton>
              )}
            </div>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        {!!customExercises.length && <CustomExercises />}
        {!!exercises.length && <AllExercises />}
        {!exercises.length && <NoExercises />}
        <div ref={ref}></div>
      </Page.Content>
    </Page>
  )
}

export default Exercises
