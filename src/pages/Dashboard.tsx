import { useLocation } from "react-router-dom"
import Page from "../components/Layout/Page"
import { DurationAndWorkoutsGraph } from "./Analytics"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useEffect } from "react"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { selectWorkoutsSortedByDescDate } from "../selectors/workoutSelectors"
import { HistoryListItem } from "./ExerciseDetails"
import { selectOverallStats } from "../selectors/statsSelectors"
import { Grouping } from "../types"
import LinkButton from "../components/LinkButton"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

const Dashboard = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const workouts = useAppSelector(selectWorkoutsSortedByDescDate)
  const stats = useAppSelector((state) =>
    selectOverallStats(state, Grouping.byDate)
  )
  useEffect(() => {
    dispatch(setHeaderTitle("Dashboard"))
  }, [location])

  return (
    <Page>
      <Page.Content>
        <div className="mt-8 grid grid-cols-1 gap-8">
          {/* STATS */}
          <div className="grid grid-cols-auto gap-x-8 gap-y-4">
            <div className="bg-white px-4 py-4 rounded-lg shadow-md whitespace-nowrap">
              <h3 className="text-gray-500 text-sm">Logged Workouts</h3>
              <h2 className="font-bold text-2xl mt-1">{stats.workoutCount}</h2>
            </div>
            <div className="bg-white px-4 py-4 rounded-lg shadow-md whitespace-nowrap">
              <h3 className="text-gray-500 text-sm">Logged Sets</h3>
              <h2 className="font-bold text-2xl mt-1">{stats.totalSets}</h2>
            </div>
            <div className="bg-white px-4 py-4 rounded-lg shadow-md whitespace-nowrap">
              <h3 className="text-gray-500 text-sm">Logged Volume</h3>
              <h2 className="font-bold text-2xl mt-1">
                {+stats.totalVolume.toFixed(2)} kg
              </h2>
            </div>
          </div>

          {/* GRAPH */}
          <div className="bg-white px-4 py-6 rounded-lg shadow-md">
            <DurationAndWorkoutsGraph onDashboard />
          </div>

          {/* LATEST WORKOUTS */}
          <div className="px-4 py-6 border rounded-lg">
            <div className="flex justify-between">
              <h3 className="bg-gray-50 text-lg font-bold">Latest Workouts</h3>
              <LinkButton variant="secondary" to="/app/workouts">
                <div className="flex items-center gap-2">
                  <h3>Workouts</h3>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </LinkButton>
            </div>
            {!workouts.length ? (
              <div><h3>No workouts found</h3></div>
            ) : (
              <ul className="mt-4 divide-y pr-2 divide-gray-200">
                {workouts.slice(0, 5).map((workout, i) => (
                  <HistoryListItem key={i} workout={workout} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Page.Content>
    </Page>
  )
}

export default Dashboard
