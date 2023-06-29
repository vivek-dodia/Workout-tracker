import { useMemo, useState, useEffect } from "react"
import Page from "../components/Layout/Page"
import { useAppDispatch, useAppSelector } from "../hooks"

import {
  GROUPING_OPTIONS,
  OVERALL_DATA_KEY_OPTIONS,
  START_DATE_OPTIONS,
} from "../utils/const"
import { isWithinInterval, parseISO } from "date-fns"
import Select from "../components/Select"
import { useLocation, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as ChartsTooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  LabelList,
} from "recharts"

import {
  selectOverallGraphData,
  selectOverallMusclesGraphData,
  selectWorkoutsGraphData,
} from "../selectors/graphDataSelectors"
import Tooltip from "../components/Tooltip"
import {
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline"
import { ValueType } from "recharts/types/component/DefaultTooltipContent"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { selectOverallStats } from "../selectors/statsSelectors"
import { Grouping } from "../types"
import StatCard from "../components/StatCard"
import LinkButton from "../components/LinkButton"
import { selectWorkouts } from "../selectors/workoutSelectors"

export const DurationAndWorkoutsGraph = ({
  onDashboard,
}: {
  onDashboard?: boolean
}) => {
  const navigate = useNavigate()
  const [selectedStartDate, setSelectedStartDate] = useState(
    START_DATE_OPTIONS[2]
  )

  const graphData = useAppSelector(selectWorkoutsGraphData)
  const filteredGraphData = useMemo(
    () =>
      graphData.filter((data) =>
        isWithinInterval(parseISO(data.date), {
          start: selectedStartDate.value,
          end: new Date(),
        })
      ),
    [graphData, selectedStartDate]
  )

  return (
    <div>
      {!onDashboard && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            className="md:col-start-3"
            label="Interval"
            value={selectedStartDate}
            options={START_DATE_OPTIONS}
            onChange={(value) => setSelectedStartDate(value)}
          />
        </div>
      )}

      {onDashboard && (
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Last month grouped by week</h2>
          <LinkButton to="/app/analytics">
            <div className="flex items-center gap-2">
              <h3>Analytics</h3>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </LinkButton>
        </div>
      )}

      {!filteredGraphData.length && (
        <div className="my-8 flex flex-col justify-center items-center gap-4">
          <div className="">
            <h3 className="font-medium">
              No graph data to show.{" "}
              {!graphData.length ? "Get to work!" : "Try changing variables."}
            </h3>
            {!!graphData.length && (
              <h4 className="text-sm text-gray-500">
                This usually means you have selected shorter interval than
                grouping.
              </h4>
            )}
          </div>
          {!graphData.length && (
            <Button
              variant="success"
              onClick={() => navigate("/app/workouts/new")}
            >
              Add workout
            </Button>
          )}
        </div>
      )}

      {!!filteredGraphData.length && (
        <ResponsiveContainer className="mx-auto mt-8" width="100%" height={400}>
          <BarChart data={filteredGraphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="formattedDate"
              interval="preserveStartEnd"
              minTickGap={15}
              tickMargin={10}
            />
            <YAxis yAxisId="left" type="number" domain={[0, "auto"]} />
            <YAxis
              yAxisId="right"
              orientation="right"
              type="number"
              domain={[0, "auto"]}
            />
            <ChartsTooltip />
            <Legend wrapperStyle={{ paddingTop: 10 }} />

            <Bar
              yAxisId="left"
              type="monotone"
              name="Duration"
              dataKey="totalDuration"
              fill="#8884d8"
            />
            <Bar
              yAxisId="right"
              type="monotone"
              name="Workouts"
              dataKey="workoutCount"
              fill="#82ca9d"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

const MusclesGraph = () => {
  const { graphData } = useAppSelector(selectOverallMusclesGraphData)

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center mb-4">
        <h2 className="font-semibold">Muscle Split</h2>
        <Tooltip text="Muscle split by volume">
          <QuestionMarkCircleIcon className="h-5 w-5" />
        </Tooltip>
      </div>
      <ResponsiveContainer className="mx-auto" width="100%" height={600}>
        <BarChart
          layout="vertical"
          data={graphData}
          margin={{
            top: 10,
            right: 0,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="muscle" type="category" interval={0} />
          <XAxis
            xAxisId="top"
            orientation="top"
            type="number"
            stroke="#8884d8"
            tickFormatter={(value) => value + " kg"}
          />
          <XAxis
            xAxisId="bottom"
            orientation="bottom"
            type="number"
            stroke="#6366F1"
          />

          <ChartsTooltip
            isAnimationActive={false}
            cursor={{ fill: "#e2e8f0" }}
            formatter={(value, _name, props) =>
              props.dataKey === "volume" ? ((+(value as number).toFixed(2) + " kg") as ValueType) : value
            }
          />
          <Legend />
          <Bar xAxisId="top" name="Volume" dataKey="volume" fill="#3B82F6">
            <LabelList
              dataKey="percentVolume"
              position="center"
              fill="#FFF"
              fontSize={10}
            />
          </Bar>
          <Bar xAxisId="bottom" name="Sets" dataKey="sets" fill="#6366F1">
            <LabelList
              dataKey="percentSets"
              position="center"
              fill="#FFF"
              fontSize={10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const OverallGraph = () => {
  const navigate = useNavigate()
  const [selectedGrouping, setSelectedGrouping] = useState(GROUPING_OPTIONS[0])
  const [selectedDataKey, setSelectedDataKey] = useState(
    OVERALL_DATA_KEY_OPTIONS[0]
  )
  const [selectedStartDate, setSelectedStartDate] = useState(
    START_DATE_OPTIONS[2]
  )

  const graphData = useAppSelector((state) =>
    selectOverallGraphData(state, selectedGrouping.value)
  )

  const filteredGraphData = useMemo(
    () =>
      graphData.filter((data) =>
        isWithinInterval(parseISO(data.date), {
          start: selectedStartDate.value,
          end: new Date(),
        })
      ),
    [graphData, selectedStartDate]
  )

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Data"
          value={selectedDataKey}
          options={OVERALL_DATA_KEY_OPTIONS}
          onChange={(value) => setSelectedDataKey(value)}
        />

        <Select
          label="Grouped By"
          value={selectedGrouping}
          options={GROUPING_OPTIONS}
          onChange={(value) => setSelectedGrouping(value)}
        />

        <Select
          label="Interval"
          value={selectedStartDate}
          options={START_DATE_OPTIONS}
          onChange={(value) => setSelectedStartDate(value)}
        />
      </div>

      {!filteredGraphData.length && (
        <div className="my-8 flex flex-col justify-center items-center gap-4">
          <div className="">
            <h3 className="font-medium">
              No graph data to show.{" "}
              {!graphData.length ? "Get to work!" : "Try changing variables."}
            </h3>
            {!!graphData.length && (
              <h4 className="text-sm text-gray-500">
                This usually means you have selected shorter interval than
                grouping.
              </h4>
            )}
          </div>
          {!graphData.length && (
            <Button
              variant="success"
              onClick={() => navigate("/app/workouts/new")}
            >
              Add workout
            </Button>
          )}
        </div>
      )}

      {!!filteredGraphData.length && (
        <ResponsiveContainer className="mx-auto mt-8" width="100%" height={400}>
          <LineChart data={filteredGraphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="formattedDate"
              interval="preserveStartEnd"
              minTickGap={15}
              tickMargin={10}
            />
            <YAxis type="number" domain={["auto", "auto"]} />
            <ChartsTooltip />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Line
              name={selectedDataKey.label}
              type="linear"
              dataKey={selectedDataKey.value}
              stroke="#2563eb"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

const Analytics = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const stats = useAppSelector((state) =>
    selectOverallStats(state, Grouping.byDate)
  )
  const workouts = useAppSelector(selectWorkouts)

  useEffect(() => {
    dispatch(setHeaderTitle("Analytics"))
  }, [location])

  if (!workouts.length)
    return (
      <Page>
        <Page.Content>
          <div className="my-8 flex flex-col justify-center items-center gap-4">
            <div className="">
              <h3 className="font-medium">No data to show. Get to work!</h3>
            </div>
            <Button
              variant="success"
              onClick={() => navigate("/app/workouts/new")}
            >
              Add workout
            </Button>
          </div>
        </Page.Content>
      </Page>
    )

  return (
    <Page>
      <Page.Content>
        <div className="grid grid-cols-1 mt-8 gap-8">
          <div className="mt-8 grid grid-cols-auto gap-4">
            <StatCard label={"Workouts"} value={stats.workoutCount} />
            <StatCard
              label={"Total Duration"}
              value={stats.totalDuration + " min"}
            />
            <StatCard label={"Total Sets"} value={stats.totalSets} />
            <StatCard label={"Total Reps"} value={stats.totalReps} />
            <StatCard
              label={"Total Volume"}
              value={+stats.totalVolume.toFixed(2) + " kg"}
            />

            <StatCard
              label={"Avg Workout Duration"}
              value={+stats.avgWorkoutDuration.toFixed(2) + " min"}
            />
            <StatCard
              label={"Avg Workout Sets"}
              value={+stats.avgWorkoutSets.toFixed(2)}
            />
            <StatCard
              label={"Avg Workout Reps"}
              value={+stats.avgWorkoutReps.toFixed(2)}
            />
            <StatCard
              label={"Avg Workout Volume"}
              value={+stats.avgWorkoutVolume.toFixed(2) + " kg"}
            />

            <StatCard
              label={"Best Workout Volume"}
              value={+stats.bestWorkoutVolume.toFixed(2) + " kg"}
            />
            <StatCard
              label={"Best Workout Sets"}
              value={stats.bestWorkoutSets}
            />
          </div>
          <OverallGraph />
          <MusclesGraph />
          <DurationAndWorkoutsGraph />
        </div>
      </Page.Content>
    </Page>
  )
}

export default Analytics
