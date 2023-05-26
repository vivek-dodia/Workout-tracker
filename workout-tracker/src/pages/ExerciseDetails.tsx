import { useParams, useNavigate } from "react-router-dom"

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
} from "@heroicons/react/24/outline"

import Page from "../components/Layout/Page"
import { useEffect, useMemo, useState, Dispatch } from "react"
import GoBackButton from "../components/GoBackButton"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectExerciseById } from "../selectors/exerciseSelectors"
import NoExerciseMatch from "./NoMatch/NoExerciseMatch"

import { Exercise, ExerciseGraphData, Grouping, GroupingOption } from "../types"
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
import { selectExerciseData } from "../selectors/dataSelectors"
import { isWithinInterval, parseISO } from "date-fns"
import {
  EXERCISE_DATA_KEY_OPTIONS,
  GROUPING_OPTIONS,
  START_DATE_OPTIONS,
} from "../utils/const"
import Select from "../components/Select"

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
    START_DATE_OPTIONS[0]
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
      <div className="flex gap-4">
        <Select
          className="flex-1"
          label="Data"
          value={selectedDataKey}
          options={EXERCISE_DATA_KEY_OPTIONS}
          onChange={(value) => setSelectedDataKey(value)}
        />

        <Select
          className="flex-1"
          label="Grouped By"
          value={selectedGrouping}
          options={GROUPING_OPTIONS}
          onChange={(value) => setSelectedGrouping(value)}
        />

        <Select
          className="flex-1"
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
  const user = useAppSelector(selectUser)
  const isCustomExercise = exercise.user === user?.id
  const data = useAppSelector((state) =>
    selectExerciseData(state, exercise.id, Grouping.byWorkout)
  )
  const [selectedGrouping, setSelectedGrouping] = useState(GROUPING_OPTIONS[0])
  const graphData = useAppSelector((state) =>
    selectExerciseGraphData(state, exercise.id, selectedGrouping.value)
  )

  useEffect(() => {
    dispatch(setHeaderTitle(exercise.name))
  }, [])

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
                <Button
                  variant="secondary"
                  onClick={() =>
                    navigate(`/app/exercises/update/${exercise.id}`)
                  }
                >
                  <div className="flex">
                    <PencilSquareIcon className="mr-2 h-5 w-5" />
                    <h3>Edit exercise</h3>
                  </div>
                </Button>
              )}

              <Button
                variant="secondary"
                onClick={() =>
                  navigate(`/app/exercises/duplicate/${exercise.id}`)
                }
              >
                <div className="flex">
                  <DocumentDuplicateIcon className="mr-2 h-5 w-5" />
                  <h3>Duplicate exercise</h3>
                </div>
              </Button>

              {isCustomExercise && (
                <Button
                  variant="alert"
                  onClick={() => dispatch(removeExercise(exercise.id))}
                >
                  <div className="flex">
                    <TrashIcon className="mr-2 h-5 w-5" />
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
        <div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {!!exercise.videoId && (
              <div className="flex flex-col gap-4">
                <YoutubeEmbed embedId={exercise.videoId} />
              </div>
            )}
            <div className="flex flex-col px-6">
              <div className="flex flex-col">
                <h1 className="font-bold text-lg">{exercise.name}</h1>
                <div className="flex gap-4 items-center">
                  <p className="text-sm text-gray-500">
                    Muscle Groups: {exercise.muscleGroups.join(", ")}
                  </p>
                  {exercise.user === user?.id && <CustomChip />}
                </div>
              </div>
              <div className="mt-4">
                <ol className="list-decimal pl-4 space-y-2 text-sm">
                  <li className="pl-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu hendrerit libero.
                  </li>
                  <li className="pl-2">
                    Donec suscipit sit amet augue vitae ultricies.
                  </li>
                  <li className="pl-2">
                    Etiam porttitor lacinia nibh, eu lobortis odio egestas sed.
                    Mauris molestie quis turpis eget iaculis.
                  </li>
                  <li className="pl-2">
                    Proin id turpis lacus. Proin orci enim, mollis non mi a,
                    ornare posuere tortor. Ut sed libero lobortis, sodales risus
                    a, laoreet ante. Nullam ut purus feugiat urna vehicula
                    faucibus ac eget turpis.
                  </li>
                  <li className="pl-2">
                    Sed in urna mattis, rhoncus augue sed, aliquet dui.
                  </li>
                </ol>
              </div>
            </div>

            <div className="col-span-2 mt-8 bg-white p-4 rounded-lg shadow-md">
              <Graph
                graphData={graphData}
                selectedGrouping={selectedGrouping}
                setSelectedGrouping={setSelectedGrouping}
              />
            </div>

            <div>
              <div className="mt-8 px-4">
                <h2 className="font-bold text-lg">Personal Records</h2>
                <ul className="mt-4 divide-y divide-gray-200">
                  <li className="flex justify-between py-4">
                    <div>
                      <h3 className="font-medium">Heaviest Weight</h3>
                    </div>
                    <div>
                      <h3 className="text-blue-500">100 kg</h3>
                    </div>
                  </li>
                  <li className="flex justify-between py-4">
                    <div>
                      <h3 className="font-medium">Best 1RM</h3>
                    </div>
                    <div>
                      <h3 className="text-blue-500">120.5 kg</h3>
                    </div>
                  </li>
                  <li className="flex justify-between py-4">
                    <div>
                      <h3 className="font-medium">Best Set Volume</h3>
                    </div>
                    <div>
                      <h3 className="text-blue-500">3000 kg</h3>
                    </div>
                  </li>
                  <li className="flex justify-between py-4">
                    <div>
                      <h3 className="font-medium">Best Session Volume</h3>
                    </div>
                    <div>
                      <h3 className="text-blue-500">9000 kg</h3>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 px-4">
                <h2 className="font-bold text-lg">Set Records</h2>
                <li className="mt-4 grid grid-cols-10 py-4">
                  <div className="col-span-2">
                    <h3 className="font-medium">Reps</h3>
                  </div>
                  <div className="col-span-8">
                    <h3 className="font-medium">Weight</h3>
                  </div>
                </li>
                <ul className="divide-y divide-gray-200">
                  <li className="grid grid-cols-10 py-4">
                    <div className="col-span-2">
                      <h3 className="">3</h3>
                    </div>
                    <div className="col-span-8">
                      <h3 className="text-blue-500">50 kg</h3>
                    </div>
                  </li>
                  <li className="grid grid-cols-10 py-4">
                    <div className="col-span-2">
                      <h3 className="">5</h3>
                    </div>
                    <div className="col-span-8">
                      <h3 className="text-blue-500">50 kg</h3>
                    </div>
                  </li>
                  <li className="grid grid-cols-10 py-4">
                    <div className="col-span-2">
                      <h3 className="">8</h3>
                    </div>
                    <div className="col-span-8">
                      <h3 className="text-blue-500">60 kg</h3>
                    </div>
                  </li>
                  <li className="grid grid-cols-10 py-4">
                    <div className="col-span-2">
                      <h3 className="">10</h3>
                    </div>
                    <div className="col-span-8">
                      <h3 className="text-blue-500">50 kg</h3>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="">
              <div className="mt-8 ml-12 px-6 pt-4 border rounded-lg">
                <h3 className="bg-gray-50 text-lg font-bold">History</h3>
                <ul className="mt-4 divide-y divide-gray-200">
                  <li className="py-6 flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="font-medium">Entry</h3>
                      <p className="text-sm text-gray-500">
                        {new Date().toISOString()}
                      </p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4" />
                  </li>
                  <li className="py-6 flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="font-medium">Entry</h3>
                      <p className="text-sm text-gray-500">
                        {new Date().toISOString()}
                      </p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4" />
                  </li>
                  <li className="py-6 flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="font-medium">Entry</h3>
                      <p className="text-sm text-gray-500">
                        {new Date().toISOString()}
                      </p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4" />
                  </li>
                  <li className="py-6 flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="font-medium">Entry</h3>
                      <p className="text-sm text-gray-500">
                        {new Date().toISOString()}
                      </p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4" />
                  </li>
                  <li className="py-6 flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="font-medium">Entry</h3>
                      <p className="text-sm text-gray-500">
                        {new Date().toISOString()}
                      </p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4" />
                  </li>
                  <div className="py-6 flex justify-end">
                    <div className="flex items-center gap-2 text-blue-500">
                      <h3>See more</h3>
                      <ArrowRightIcon className="h-4 w-4" />
                    </div>
                  </div>
                </ul>
              </div>
            </div>
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
