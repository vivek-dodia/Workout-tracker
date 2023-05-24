import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectWorkoutById } from "../selectors/workoutSelectors"
import NoWorkoutMatch from "./NoMatch/NoWorkoutMatch"
import Page from "../components/Layout/Page"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { Workout } from "../types"
import ExerciseCard from "../components/ExerciseCard"
import { selectUser } from "../selectors/userSelectors"
import GoBackButton from "../components/GoBackButton"
import Dropdown from "../components/Dropdown"
import DropdownSection from "../components/Dropdown/DropdownSection"
import EditOption from "../components/Dropdown/EditOption"
import DuplicateOption from "../components/Dropdown/DuplicateOption"
import DeleteOption from "../components/Dropdown/DeleteOption"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartsTooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts"
import {
  DocumentDuplicateIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import Tooltip from "../components/Tooltip"
import { format, parseISO } from "date-fns"
import { selectWorkoutGraphData } from "../selectors/graphDataSelectors"
import { ValueType } from "recharts/types/component/DefaultTooltipContent"
import { selectWorkoutData } from "../selectors/dataSelectors"
import Button from "../components/Button"
import { removeWorkout } from "../reducers/workoutReducer"

const Details = ({ workout }: { workout: Workout }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const data = useAppSelector((state) => selectWorkoutData(state, workout.id))
  const graphData = useAppSelector((state) =>
    selectWorkoutGraphData(state, workout.id)
  )

  useEffect(() => {
    dispatch(setHeaderTitle(workout.name))
  }, [])

  const deleteWorkout = (id: string) => {
    dispatch(removeWorkout(id)).then(() => navigate("/app/workouts"))
  }

  return (
    <Page>
      <Page.Header>
        <div className="flex h-full items-center justify-between py-4 container px-6 mx-auto">
          <div>
            <GoBackButton to="/app/workouts">Workouts</GoBackButton>
          </div>
          <div className="flex items-center gap-4"> 
            <div className="hidden lg:flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/app/workouts/update/${workout.id}`)}
              >
                <div className="flex">
                  <PencilSquareIcon className="mr-2 h-5 w-5" />
                  <h3>Edit workout</h3>
                </div>
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  navigate(`/app/workouts/duplicate/${workout.id}`)
                }
              >
                <div className="flex">
                  <DocumentDuplicateIcon className="mr-2 h-5 w-5" />
                  <h3>Duplicate workout</h3>
                </div>
              </Button>
              <Button
                variant="alert"
                onClick={() => deleteWorkout(workout.id)}
              >
                <div className="flex">
                  <TrashIcon className="mr-2 h-5 w-5" />
                  <h3>Delete workout</h3>
                </div>
              </Button>
            </div>
            <div className="block lg:hidden">
            <Dropdown>
              <DropdownSection>
                <EditOption
                  title="Edit workout"
                  onClick={() => navigate(`/app/workouts/update/${workout.id}`)}
                />
                <DuplicateOption
                  title="Duplicate workout"
                  onClick={() =>
                    navigate(`/app/workouts/duplicate/${workout.id}`)
                  }
                />
              </DropdownSection>
              <DropdownSection>
                <DeleteOption
                  title="Delete workout"
                  onClick={() => deleteWorkout(workout.id)}
                />
              </DropdownSection>
            </Dropdown></div>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-8">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center mb-4">
              <h2 className="font-semibold">Muscle Split</h2>
              <Tooltip text="Muscle split by volume">
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </Tooltip>
            </div>
            <ResponsiveContainer className="mx-auto" width="100%" height={500}>
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
                  tickFormatter={(value) => value + "kg"}
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
                    props.dataKey === "volume"
                      ? ((value + "kg") as ValueType)
                      : value
                  }
                />
                <Legend />
                <Bar
                  xAxisId="top"
                  name="Volume"
                  dataKey="volume"
                  fill="#3B82F6"
                >
                  <LabelList
                    dataKey="percentVolume"
                    position="center"
                    fill="#FFF"
                    fontSize={
                      data.muscleGroups.length >= 8
                        ? 10
                        : data.muscleGroups.length > 4
                        ? 12
                        : 16
                    }
                  />
                </Bar>
                <Bar xAxisId="bottom" name="Sets" dataKey="sets" fill="#6366F1">
                  <LabelList
                    dataKey="percentSets"
                    position="center"
                    fill="#FFF"
                    fontSize={
                      data.muscleGroups.length >= 8
                        ? 10
                        : data.muscleGroups.length > 4
                        ? 12
                        : 16
                    }
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-4">
            <div className="mb-2">
              <p className="font-bold text-2xl">{workout.name}</p>
            </div>

            <div className="flex justify-between">
              <p>Date</p>
              <p className="text-gray-500">
                {format(parseISO(workout.date), "dd.MM.yyyy - H:mm")}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Duration</p>
              <p className="text-gray-500">{workout.duration} min</p>
            </div>

            <div className="flex justify-between">
              <p>Exercises</p>
              <p className="text-gray-500">{data.exerciseCount}</p>
            </div>

            <div className="flex justify-between">
              <p>Sets</p>
              <p className="text-gray-500">{data.setsCount}</p>
            </div>

            <div className="flex justify-between">
              <p>Reps</p>
              <p className="text-gray-500">{data.totalReps}</p>
            </div>

            <div className="flex justify-between">
              <p>Heaviest Weight</p>
              <p className="text-gray-500">{data.heaviestWeight} kg</p>
            </div>

            <div className="flex justify-between">
              <p>Total volume</p>
              <p className="text-gray-500">{data.totalVolume} kg</p>
            </div>

            <div className="flex justify-between">
              <p>Top Set</p>
              <p className="text-gray-500">
                {data.topSet.reps} x {data.topSet.weight} kg
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-8">
          {workout.exercises.map((exercise, i) => (
            <ExerciseCard key={i} exercise={exercise} user={user} />
          ))}
        </div>
      </Page.Content>
    </Page>
  )
}

const WorkoutDetails = () => {
  const { id } = useParams()
  const workout = useAppSelector((state) => selectWorkoutById(state, id || ""))

  if (!workout) return <NoWorkoutMatch />

  return <Details workout={workout} />
}

export default WorkoutDetails
