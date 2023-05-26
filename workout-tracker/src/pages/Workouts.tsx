import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { selectWorkoutsByQuery } from "../selectors/workoutSelectors"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import Page from "../components/Layout/Page"
import SearchBar from "../components/SearchBar"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { format, parseISO } from "date-fns"
import { useInView } from "react-intersection-observer"
import Button from "../components/Button"

const Workouts = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState<string>("")

  const workouts = useAppSelector((state) =>
    selectWorkoutsByQuery(state, searchQuery)
  )

  const [page, setPage] = useState(1)
  const pageIncrease = 25
  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView) {
        setPage(page + 1)
      }
    },
  })

  useEffect(() => {
    dispatch(setHeaderTitle("Workouts"))
  }, [location])

  const AllWorkouts = () => (
    <>
      <label className="text-gray-500 text-sm">
        Workouts ({workouts.length})
      </label>
      <ul className="mt-1 divide-y divide-gray-200">
        {workouts.slice(0, page * pageIncrease).map((workout) => (
          <Link
            key={workout.id}
            to={`/app/workouts/${workout.id}`}
            className="flex justify-between gap-x-6 py-5 group items-center"
          >
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-4 py-1 items-center">
                <div>
                  <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 group-hover:bg-blue-500 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300 group-hover:text-white">
                      {workout.name[0]}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-lg text-gray-800 group-hover:text-black">
                    {workout.name}
                    <span className="ml-2 text-sm font-normal text-gray-500 group-hover:text-gray-600">
                      {format(parseISO(workout.date), "E dd.MM.yy - HH:mm")}
                    </span>
                  </p>
                  <div className="mt-1 flex gap-4 items-center">
                    <p className="text-xs text-gray-500 group-hover:text-gray-600">
                      {workout.exercises
                        .map((exercise) => exercise._exercise.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
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
            <Button
              variant="success"
              onClick={() => navigate("/app/workouts/new")}
            >
              Add workout
            </Button>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        {!!workouts.length ? <AllWorkouts /> : <NoWorkouts />}
        <div ref={ref}></div>
      </Page.Content>
    </Page>
  )
}

export default Workouts
