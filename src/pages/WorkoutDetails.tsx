import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectWorkoutById } from "../selectors/workoutSelectors"
import NoWorkoutMatch from "./NoMatch/NoWorkoutMatch"
import Page from "../components/Layout/Page"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { NotificationType, Workout } from "../types"
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
  TrashIcon,
} from "@heroicons/react/24/outline"
import { format, parseISO } from "date-fns"
import { selectWorkoutGraphData } from "../selectors/graphDataSelectors"
import { ValueType } from "recharts/types/component/DefaultTooltipContent"
import { selectWorkoutStats } from "../selectors/statsSelectors"
import Button from "../components/Button"
import { removeWorkout } from "../reducers/workoutReducer"
import Spinner from "../components/Spinner"
import useNotify from "../hooks/useNotify"
import StatCard from "../components/StatCard"
import LinkButton from "../components/LinkButton"
import Confirmation from "../components/Confirmation"

const Details = ({ workout }: { workout: Workout }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const { notify } = useNotify()
  const stats = useAppSelector((state) => selectWorkoutStats(state, workout.id))
  const graphData = useAppSelector((state) =>
    selectWorkoutGraphData(state, workout.id)
  )
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  useEffect(() => {
    dispatch(setHeaderTitle(workout.name))
  }, [])

  const deleteWorkout = (id: string) => {
    setButtonLoading(true)
    dispatch(removeWorkout(id))
      .then(() => navigate("/app/workouts"))
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
            <GoBackButton to="/app/workouts">Workouts</GoBackButton>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex gap-2">
              <LinkButton
                variant="secondary"
                to={`/app/workouts/update/${workout.id}`}
              >
                <div className="flex">
                  <PencilSquareIcon className="mr-2 h-5 w-5" />
                  <h3>Edit workout</h3>
                </div>
              </LinkButton>
              <LinkButton
                variant="secondary"
                to={`/app/workouts/duplicate/${workout.id}`}
              >
                <div className="flex">
                  <DocumentDuplicateIcon className="mr-2 h-5 w-5" />
                  <h3>Duplicate workout</h3>
                </div>
              </LinkButton>
              <Button variant="alert" onClick={() => setConfirmationOpen(true)}>
                <div className="flex gap-2">
                  {buttonLoading ? (
                    <Spinner />
                  ) : (
                    <TrashIcon className="h-5 w-5" />
                  )}
                  <h3>Delete workout</h3>
                </div>
              </Button>
            </div>
            <div className="block lg:hidden">
              <Dropdown>
                <DropdownSection>
                  <EditOption
                    title="Edit workout"
                    onClick={() =>
                      navigate(`/app/workouts/update/${workout.id}`)
                    }
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
                    onClick={() => setConfirmationOpen(true)}
                  />
                </DropdownSection>
              </Dropdown>
            </div>
          </div>
        </div>
      </Page.Header>

      <Page.Content>
        <div className="mt-8 grid grid-cols-1">
          {/* TITLE */}
          <div>
            <h1 className="font-bold text-3xl">{workout.name}</h1>
            <p className="text-gray-500 mt-1">
              {format(parseISO(workout.date), "dd.MM.yyyy - H:mm")}
            </p>
            <p className="text-gray-500 mt-1">
              {workout.notes}
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-auto mt-8 gap-4">
            <StatCard label="Duration" value={workout.duration + " min"} />
            <StatCard label="Exercises" value={stats.exerciseCount} />
            <StatCard label="Sets" value={stats.setsCount} />
            <StatCard label="Reps" value={stats.totalReps} />
            <StatCard
              label="Heaviest Weight"
              value={stats.heaviestWeight + " kg"}
            />
            <StatCard label="Total volume" value={+stats.totalVolume.toFixed(2) + " kg"} />
            <StatCard
              label="Top Set"
              value={stats.topSet.reps + " x " + stats.topSet.weight + " kg"}
            />
          </div>

          {/* GRAPH */}
          <div className="flex flex-col mt-8 bg-white px-4 py-6 rounded-lg shadow-md">
            <div className="flex gap-2 items-center mb-4">
              <h2 className="font-semibold">Muscle Split</h2>
            </div>
            <div>
              <ResponsiveContainer
                className="mx-auto"
                width="100%"
                height={500}
              >
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
                      props.dataKey === "volume"
                        ? ((+(value as number).toFixed(2) + " kg") as ValueType)
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
                        stats.muscleGroups.length >= 8
                          ? 10
                          : stats.muscleGroups.length > 4
                          ? 12
                          : 16
                      }
                    />
                  </Bar>
                  <Bar
                    xAxisId="bottom"
                    name="Sets"
                    dataKey="sets"
                    fill="#6366F1"
                  >
                    <LabelList
                      dataKey="percentSets"
                      position="center"
                      fill="#FFF"
                      fontSize={
                        stats.muscleGroups.length >= 8
                          ? 10
                          : stats.muscleGroups.length > 4
                          ? 12
                          : 16
                      }
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* WORKOUT */}
        <div className="space-y-4 mt-8">
          {workout.exercises.map((exercise, i) => (
            <ExerciseCard key={i} exercise={exercise} user={user} />
          ))}
        </div>

        <Confirmation
          show={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={() => deleteWorkout(workout.id)}
          title={`Delete ${workout.name}?`}
          message="This will delete the workout and all related data. This action is irreversible."
        />
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
