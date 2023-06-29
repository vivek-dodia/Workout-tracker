import * as types from "../types"

import { CustomChip } from "../pages/Exercises"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import Tooltip from "./Tooltip"

type ExerciseCardProps = {
  exercise: types.WorkoutExercise
  user: types.User | null
}

const ExerciseCard = ({ exercise, user }: ExerciseCardProps) => {
  return (
    <div className="bg-white px-4 py-6 rounded-lg shadow-md">
      {/* EXERCISE */}
      <div className="">
        <Link
          to={`/app/exercises/${exercise._exercise.id}`}
          className="flex justify-between gap-x-6 group items-center cursor-pointer"
        >
          <div className="flex gap-x-4 py-1">
            <div>
              <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 group-hover:bg-blue-500 rounded-full dark:bg-gray-600">
                <span className="font-medium dark:text-gray-300 group-hover:text-white text-gray-600">
                  {exercise._exercise.name[0]}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mt-1 flex gap-4 items-center">
                <p className="font-semibold">{exercise._exercise.name}</p>
                {exercise._exercise.user === user?.id && <CustomChip />}
              </div>
              <p className="text-sm text-gray-600">
                {exercise._exercise.muscleGroups.join(", ")} |{" "}
                {exercise.sets.length} sets | Total volume{" "}
                {
                  +exercise.sets
                    .map((set) => set.reps * set.actualWeight)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)
                }{" "}
                kg
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <ChevronRightIcon className="h-6 w-6 group-hover:text-blue-500" />
          </div>
        </Link>
        {!!exercise.notes && (
          <div className="p-2 mt-1">
            <h3 className="text-gray-500">{exercise.notes}</h3>
          </div>
        )}
      </div>

      {/* SETS */}
      <div className="mt-2">
        {/* TABLE HEADER */}
        <div className="flex items-center gap-4">
          <div className="flex-1 grid grid-cols-12 text-xs font-semibold cursor-default">
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              <Tooltip text="Set number">Set</Tooltip>
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              <Tooltip text="Set type. Warmup or working.">Type</Tooltip>
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              <Tooltip text="Repetitions per set.">Reps</Tooltip>
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              <Tooltip text="Weight per rep in kg.">Weight</Tooltip>
            </div>
          </div>
        </div>

        {/* TABLE CONTENT */}
        {exercise.sets.map((set, setIndex) => (
          <div key={setIndex} className="flex items-center gap-4">
            <div className="flex-1 grid grid-cols-12 text-xs">
              <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
                {setIndex + 1}
              </div>
              <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
                {set.type}
              </div>
              <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
                {set.reps}
              </div>
              <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
                {+set.actualWeight.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExerciseCard
