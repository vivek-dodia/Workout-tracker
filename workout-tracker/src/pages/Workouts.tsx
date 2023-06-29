import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { selectWorkoutsByQuery } from "../selectors/workoutSelectors"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import Page from "../components/Layout/Page"
import SearchBar from "../components/SearchBar"
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline"
import { format, parseISO } from "date-fns"
import { useInView } from "react-intersection-observer"
import LinkButton from "../components/LinkButton"
import Dropdown from "../components/Dropdown"
import DropdownSection from "../components/Dropdown/DropdownSection"
import AddOption from "../components/Dropdown/AddOption"

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
                  <p className="font-semibold text-gray-800 group-hover:text-black">
                    {workout.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
                    {format(parseISO(workout.date), "E dd.MM.yy")}
                  </p>
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
          <div className="flex-row flex gap-4 items-center">
            <SearchBar
              className="flex-1"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search workouts..."
            />

            <div className="block sm:hidden">
              <Dropdown>
                <DropdownSection>
                  <AddOption
                    title="Add workout"
                    color="green-500"
                    onClick={() => navigate("/app/workouts/new")} 
                  />
                </DropdownSection>
              </Dropdown>
            </div>
            <LinkButton
              className="gap-2 items-center hidden sm:flex"
              variant="success"
              to="/app/workouts/new"
            >
              <PlusIcon className="h6 w-6" />
              <h3>Add workout</h3>
            </LinkButton>
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
