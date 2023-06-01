import { useParams, useNavigate, Link } from "react-router-dom"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import {
  ChevronRightIcon,
  ArrowRightIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline"

import Page from "../components/Layout/Page"
import { useEffect, useMemo, useState, Dispatch } from "react"
import GoBackButton from "../components/GoBackButton"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectExerciseById } from "../selectors/exerciseSelectors"
import NoExerciseMatch from "./NoMatch/NoExerciseMatch"

import {
  Exercise,
  ExerciseGraphData,
  ExerciseSetRecord,
  ExerciseStats,
  Grouping,
  GroupingOption,
  NotificationType,
  Workout,
} from "../types"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { selectUser } from "../selectors/userSelectors"
import { removeExercise } from "../reducers/exerciseReducer"
import Dropdown from "../components/Dropdown"
import DeleteOption from "../components/Dropdown/DeleteOption"
import DuplicateOption from "../components/Dropdown/DuplicateOption"
import EditOption from "../components/Dropdown/EditOption"
import DropdownSection from "../components/Dropdown/DropdownSection"
import Button from "../components/Button"
import YoutubeEmbed from "../components/YoutubeEmbed"
import { CustomChip } from "./Exercises"
import { selectExerciseGraphData } from "../selectors/graphDataSelectors"
import { selectExerciseStats } from "../selectors/statsSelectors"
import { format, isWithinInterval, parseISO } from "date-fns"
import {
  EXERCISE_DATA_KEY_OPTIONS,
  GROUPING_OPTIONS,
  START_DATE_OPTIONS,
} from "../utils/const"
import Select from "../components/Select"
import { selectWorkoutsByExerciseId } from "../selectors/workoutSelectors"
import Spinner from "../components/Spinner"
import useNotify from "../hooks/useNotify"
import StatCard from "../components/StatCard"
import LinkButton from "../components/LinkButton"

type HistoryListItemProps = {
  workout: Workout
}

const HistoryListItem = ({ workout }: HistoryListItemProps) => {
  return (
    <Link
      key={workout.id}
      to={`/app/workouts/${workout.id}`}
      className="flex justify-between py-4 group items-center"
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
      <div className="">
        <ChevronRightIcon className="h-6 w-6 group-hover:text-blue-500" />
      </div>
    </Link>
  )
}

type HistoryProps = {
  workouts: Workout[]
  showOnlyHistory: boolean
  setShowOnlyHistory: Dispatch<boolean>
}

const History = ({ workouts }: HistoryProps) => {
  return (
    <div className="">
      <div className="px-6 pt-4 border rounded-lg">
        <h3 className="bg-gray-50 text-lg font-bold">
          History{" "}
          <span className="font-normal text-sm">({workouts.length})</span>
        </h3>
        <ul className="mt-4 divide-y h-96 divide-gray-200 overflow-y-auto">
          {workouts.map((workout) => (
            <HistoryListItem workout={workout} />
          ))}
        </ul>
      </div>
    </div>
  )
}

type SetRecordsListItemProps = {
  reps: string
  weight: string
  volume: string
}

const SetRecordsListItem = ({
  reps,
  weight,
  volume,
}: SetRecordsListItemProps) => {
  return (
    <li className="grid grid-cols-3 py-4">
      <div className="col-span-1">
        <h3 className="text-blue-500">{reps}</h3>
      </div>
      <div className="col-span-1 text-center">
        <h3 className="text-blue-500">{weight} kg</h3>
      </div>
      <div className="col-span-1 text-end">
        <h3 className="text-blue-500">{volume} kg</h3>
      </div>
    </li>
  )
}

type SetRecordsProps = {
  setRecords: ExerciseSetRecord[]
  showOnlySetRecords: boolean
  setShowOnlySetRecords: Dispatch<boolean>
}

const SetRecords = ({
  setRecords,
  showOnlySetRecords,
  setShowOnlySetRecords,
}: SetRecordsProps) => {
  if (!setRecords.length) return null
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-bold text-lg">Set Records</h2>

        <div className="mt-4 grid grid-cols-3 py-4">
          <div className="col-span-1">
            <h3 className="font-medium">Reps</h3>
          </div>
          <div className="col-span-1 text-center">
            <h3 className="font-medium">Weight</h3>
          </div>
          <div className="col-span-1 text-end">
            <h3 className="font-medium">Total Volume</h3>
          </div>
        </div>
        <ul className="divide-y divide-gray-200">
          {showOnlySetRecords ? (
            <>
              {setRecords.map((record) => (
                <SetRecordsListItem
                  reps={record.reps.toString()}
                  weight={record.weight.toString()}
                  volume={record.volume.toString()}
                />
              ))}
            </>
          ) : (
            <>
              {setRecords.slice(0, 5).map((record) => (
                <SetRecordsListItem
                  reps={record.reps.toString()}
                  weight={record.weight.toString()}
                  volume={record.volume.toString()}
                />
              ))}
            </>
          )}
        </ul>
        {setRecords.length > 5 && !showOnlySetRecords && (
          <div className="pt-4 flex justify-end">
            <Button onClick={() => setShowOnlySetRecords(!showOnlySetRecords)}>
              <div className="flex items-center gap-2">
                <h3>See all</h3>
                <ArrowRightIcon className="h-4 w-4" />
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

type StatsListItemProps = {
  label: string
  value: string
}

const StatsListItem = ({ label, value }: StatsListItemProps) => {
  return (
    <li className="flex justify-between py-2">
      <div>
        <h3 className="font-medium">{label}</h3>
      </div>
      <div>
        <h3 className="font-medium text-blue-500">{value}</h3>
      </div>
    </li>
  )
}

type StatsProps = {
  stats: ExerciseStats
}

const Stats = ({ stats }: StatsProps) => {
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-bold text-lg">Statistics</h2>
        <ul className="mt-4 divide-gray-200">
          <StatsListItem
            label="Heaviest Weight"
            value={stats.heaviestWeight + " kg"}
          />
          <StatsListItem label="Best 1RM" value={stats.bestOrm + " kg"} />
          <StatsListItem
            label="Best Set Volume"
            value={stats.bestSetVolume + " kg"}
          />
          <StatsListItem
            label="Best Workout Volume"
            value={stats.bestWorkoutVolume + " kg"}
          />
          <StatsListItem label="Total Reps" value={stats.totalReps + " reps"} />
          <StatsListItem label="Total Sets" value={stats.totalSets + " sets"} />
          <StatsListItem
            label="Total Volume"
            value={stats.totalVolume + " kg"}
          />
          <StatsListItem
            label="Average Workout Reps"
            value={stats.avgWorkoutReps + " reps"}
          />
          <StatsListItem
            label="Average Workout Sets"
            value={stats.avgWorkoutSets + " sets"}
          />
          <StatsListItem
            label="Average Workout Volume"
            value={stats.avgWorkoutVolume + " kg"}
          />
        </ul>
      </div>
    </div>
  )
}

type GraphProps = {
  graphData: ExerciseGraphData[]
  selectedGrouping: GroupingOption
  setSelectedGrouping: Dispatch<GroupingOption>
}

const Graph = ({
  graphData,
  selectedGrouping,
  setSelectedGrouping,
}: GraphProps) => {
  const navigate = useNavigate()
  const [selectedDataKey, setSelectedDataKey] = useState(
    EXERCISE_DATA_KEY_OPTIONS[0]
  )
  const [selectedStartDate, setSelectedStartDate] = useState(
    START_DATE_OPTIONS[2]
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
          options={EXERCISE_DATA_KEY_OPTIONS}
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

const Details = ({ exercise }: { exercise: Exercise }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { notify } = useNotify()
  const user = useAppSelector(selectUser)
  const isCustomExercise = exercise.user === user?.id
  const [selectedGrouping, setSelectedGrouping] = useState(GROUPING_OPTIONS[0])
  const [buttonLoading, setButtonLoading] = useState(false)

  const stats = useAppSelector((state) =>
    selectExerciseStats(state, exercise.id, Grouping.byDate)
  )
  const graphData = useAppSelector((state) =>
    selectExerciseGraphData(state, exercise.id, selectedGrouping.value)
  )
  const workouts = useAppSelector((state) =>
    selectWorkoutsByExerciseId(state, exercise.id)
  )

  useEffect(() => {
    dispatch(setHeaderTitle(exercise.name))
  }, [])

  const deleteExercise = (id: string) => {
    setButtonLoading(true)
    dispatch(removeExercise(id))
      .then(() => navigate(`/app/exercises`))
      .catch(() => {
        notify("Something went wrong", NotificationType.alert)
      })
      .finally(() => setButtonLoading(false))
  }

  return (
    <Page>
      <Page.Header>
        <div className="flex h-full items-center justify-between py-4 container px-6 mx-auto">
          <div>
            <GoBackButton to="/app/exercises">Exercises</GoBackButton>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex gap-2">
              {isCustomExercise && (
                <LinkButton
                  variant="secondary"
                  to={`/app/exercises/update/${exercise.id}`}
                >
                  <div className="flex">
                    <PencilSquareIcon className="mr-2 h-5 w-5" />
                    <h3>Edit exercise</h3>
                  </div>
                </LinkButton>
              )}

              <LinkButton
                variant="secondary"
                to={`/app/exercises/duplicate/${exercise.id}`}
              >
                <div className="flex">
                  <DocumentDuplicateIcon className="mr-2 h-5 w-5" />
                  <h3>Duplicate exercise</h3>
                </div>
              </LinkButton>

              {isCustomExercise && (
                <Button
                  variant="alert"
                  onClick={() => deleteExercise(exercise.id)}
                >
                  <div className="flex gap-2">
                    {buttonLoading ? (
                      <Spinner />
                    ) : (
                      <TrashIcon className="h-5 w-5" />
                    )}
                    <h3>Delete exercise</h3>
                  </div>
                </Button>
              )}
            </div>
            <div className="block lg:hidden">
              <Dropdown>
                <DropdownSection>
                  {isCustomExercise && (
                    <EditOption
                      title="Edit Exercise"
                      onClick={() =>
                        navigate(`/app/exercises/update/${exercise.id}`)
                      }
                    />
                  )}
                  <DuplicateOption
                    title="Duplicate Exercise"
                    onClick={() =>
                      navigate(`/app/exercises/duplicate/${exercise.id}`)
                    }
                  />
                </DropdownSection>
                {isCustomExercise && (
                  <DropdownSection>
                    <DeleteOption
                      title="Delete Exercise"
                      onClick={() => dispatch(removeExercise(exercise.id))}
                    />
                  </DropdownSection>
                )}
              </Dropdown>
            </div>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        <div className="mt-8 grid grid-cols-1 gap-y-8">
          {/* TITLE */}
          <div>
            <div className="flex gap-4 items-center">
              <h1 className="font-bold text-3xl">{exercise.name}</h1>
              {isCustomExercise && <CustomChip />}
            </div>
            <p className="mt-1 text-gray-500">
              Muscle Groups: {exercise.muscleGroups.join(", ")}
            </p>
          </div>

          {/* VIDEO? */}
          {!!exercise.videoId && (
            <div className="max-w-screen-md w-full">
              <YoutubeEmbed embedId={exercise.videoId} />
            </div>
          )}

          {/* STATS */}
          <div className="grid grid-cols-auto gap-4">
            <StatCard
              label="Heaviest Weight"
              value={stats.heaviestWeight + " kg"}
            />
            <StatCard label="Best 1RM" value={stats.bestOrm + " kg"} />
            <StatCard
              label="Best Set Volume"
              value={stats.bestSetVolume + " kg"}
            />
            <StatCard
              label="Best Workout Volume"
              value={stats.bestWorkoutVolume + " kg"}
            />
            <StatCard label="Total Reps" value={stats.totalReps + " reps"} />
            <StatCard label="Total volume" value={stats.totalVolume + "kg"} />
            <StatCard label="Total Sets" value={stats.totalSets + " sets"} />
            <StatCard
              label="Average Workout Reps"
              value={stats.avgWorkoutReps + " reps"}
            />
            <StatCard
              label="Average Workout Sets"
              value={stats.avgWorkoutSets + " sets"}
            />
            <StatCard
              label="Average Workout Volume"
              value={stats.avgWorkoutVolume + " kg"}
            />
          </div>

          {/* GRAPH */}
          <div className="bg-white px-4 py-6 rounded-lg shadow-md">
            <Graph
              graphData={graphData}
              selectedGrouping={selectedGrouping}
              setSelectedGrouping={setSelectedGrouping}
            />
          </div>

          {/* SET RECORDS */}
          <div>
            <h2 className="font-bold text-lg">Set Records</h2>
            <div className="mt-8 grid grid-cols-auto gap-4">
              {stats.setRecords.map((record) => (
                <StatCard
                  label={record.reps + " x " + record.weight + " kg"}
                  value={record.volume + " kg"}
                />
              ))}
            </div>
          </div>

          {/* HISTORY */}
          <div className="px-4 py-6 border rounded-lg">
            <h3 className="bg-gray-50 text-lg font-bold">
              History{" "}
              <span className="font-normal text-sm">({workouts.length})</span>
            </h3>
            <ul className="mt-4 divide-y pr-2 max-h-[500px] divide-gray-200 overflow-y-auto">
              {workouts.map((workout) => (
                <HistoryListItem workout={workout} />
              ))}
            </ul>
          </div>
        </div>
      </Page.Content>
    </Page>
  )
}

const ExerciseDetails = () => {
  const { id } = useParams()
  const exercise = useAppSelector((state) =>
    selectExerciseById(state, id || "")
  )

  if (!exercise) return <NoExerciseMatch />

  return <Details exercise={exercise} />
}

export default ExerciseDetails
