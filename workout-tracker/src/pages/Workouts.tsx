import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Link, useLocation } from "react-router-dom"
import { selectUser } from "../selectors/userSelectors"
import { selectWorkoutsByQuery } from "../selectors/workoutSelectors"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import Page from "../components/Layout/Page"
import SearchBar from "../components/SearchBar"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { format, parseISO } from "date-fns"

const Workouts = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const user = useAppSelector(selectUser)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const workouts = useAppSelector((state) =>
    selectWorkoutsByQuery(state, searchQuery)
  )

  useEffect(() => {
    dispatch(setHeaderTitle("Workouts"))
  }, [location])

  const AllWorkouts = () => (
    <>
      <label className="text-gray-500 text-sm">
        Workouts ({workouts.length})
      </label>
      <ul className="mt-1 divide-y divide-gray-200">
        {workouts.map((workout) => (
          <Link
            key={workout.id}
            to={`/app/workouts/${workout.id}`}
            className="flex justify-between gap-x-6 py-5 group items-center"
          >
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-4 py-1">
                <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 group-hover:bg-blue-500 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300 group-hover:text-white">
                    {workout.name[0]}
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-gray-800 group-hover:text-black">
                    {workout.name}
                  </p>
                  <div className="mt-1 flex gap-4 items-center">
                    <p className="text-sm text-gray-500 group-hover:text-gray-600">
                      {format(parseISO(workout.date), "dd.MM.yy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="flex gap-x-4">
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-500 group-hover:text-gray-600">
                    Exercises
                  </p>
                  <div className="mt-1 flex gap-4 items-center">
                    <p className="font-semibold text-sm text-gray-800 group-hover:text-black">
                      {workout.exercises.length}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-500 group-hover:text-gray-600">
                    Duration
                  </p>
                  <div className="mt-1 flex gap-4 items-center">
                    <p className="font-semibold text-sm text-gray-800 group-hover:text-black">
                      {workout.duration} min
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-500 group-hover:text-gray-600">
                    Volume
                  </p>
                  <div className="mt-1 flex gap-4 items-center">
                    <p className="font-semibold text-sm text-gray-800 group-hover:text-black">
                      {workout.exercises
                        .map((exercise) => exercise.sets)
                        .flat()
                        .map((set) => set.reps * set.weight)
                        .reduce((a, b) => a + b, 0)}{" "}
                      kg
                    </p>
                  </div>
                </div>
              </div>
              <ChevronRightIcon className="h-6 w-6 group-hover:text-blue-500" />
            </div>
          </Link>
        ))}
      </ul>
    </>
  )

  const NoWorkouts = () => (
    <>
      <div>No Workouts Found</div>
    </>
  )

  return (
    <Page>
      <Page.Header>
        <div className="py-4 container px-6 mx-auto">
          <div className="grid grid-cols-9 gap-4 items-center">
            <SearchBar
              className="col-span-8"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search workouts..."
            />
            <Link
              to="/app/workouts/new"
              className="bg-green-500 hover:bg-green-700 rounded-md p-2 text-white flex items-center justify-center"
            >
              <h3>Add workout</h3>
            </Link>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        {!!workouts.length ? <AllWorkouts /> : <NoWorkouts />}
      </Page.Content>
    </Page>
  )
}

export default Workouts
