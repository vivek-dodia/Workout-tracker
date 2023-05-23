import { useParams, useNavigate } from "react-router-dom"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartsTooltip,
  ResponsiveContainer,
} from "recharts"

import {
  ChevronRightIcon,
  ArrowRightIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"

import Page from "../components/Layout/Page"
import { useEffect } from "react"
import GoBackButton from "../components/GoBackButton"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectExerciseById } from "../selectors/exerciseSelectors"
import NoExerciseMatch from "./NoMatch/NoExerciseMatch"

import { Exercise } from "../types"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { selectUser } from "../selectors/userSelectors"
import { removeExercise } from "../reducers/exerciseReducer"
import Dropdown from "../components/Dropdown"
import DeleteOption from "../components/Dropdown/DeleteOption"
import DuplicateOption from "../components/Dropdown/DuplicateOption"
import EditOption from "../components/Dropdown/EditOption"
import DropdownSection from "../components/Dropdown/DropdownSection"
import Button from "../components/Button"

const Details = ({ exercise }: { exercise: Exercise }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const isCustomExercise = exercise.user === user?.id

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
                <iframe
                  className="aspect-video"
                  src={`https://www.youtube.com/embed/${exercise.videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="flex flex-col px-6">
              <div className="flex flex-col">
                <h1 className="font-bold text-lg">{exercise.name}</h1>
                <p className="text-sm text-gray-500">
                  Muscle Groups: {exercise.muscleGroups.join(", ")}
                </p>
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

            <div className="col-span-2 mt-8">
              <ResponsiveContainer
                className="mx-auto"
                width="100%"
                height={300}
              >
                <LineChart
                  data={[
                    {
                      name: "Page A",
                      uv: 4000,
                      pv: 2400,
                      amt: 2400,
                    },
                    {
                      name: "Page B",
                      uv: 3000,
                      pv: 1398,
                      amt: 2210,
                    },
                  ]}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval="preserveStartEnd"
                    minTickGap={15}
                    tickMargin={10}
                  />
                  <YAxis type="number" domain={["auto", "auto"]} />
                  <ChartsTooltip />
                  <Line
                    name={"label"}
                    type="monotone"
                    dataKey={"pv"}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
