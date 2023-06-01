import * as types from "../types"

import { CustomChip } from "../pages/Exercises"

type ExerciseCardProps = {
  exercise: types.WorkoutExercise
  user: types.User | null
}

const ExerciseCard = ({ exercise, user }: ExerciseCardProps) => {
  return (
    <div className="bg-white px-4 py-6 rounded-lg shadow-md">
      {/* EXERCISE */}
      <div className="">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 py-1">
            <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-blue-500 rounded-full dark:bg-gray-600">
              <span className="font-medium dark:text-gray-300 text-white">
                {exercise._exercise.name[0]}
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mt-1 flex gap-4 items-center">
                <p className="font-semibold">{exercise._exercise.name}</p>
                {exercise._exercise.user === user?.id && <CustomChip />}
              </div>
              <p className="text-sm text-gray-600">
                {exercise._exercise.muscleGroups.join(", ")} |{" "}
                {exercise.sets.length} sets | Total volume{" "}
                {exercise.sets
                  .map((set) => set.reps * set.actualWeight)
                  .reduce((a, b) => a + b, 0)}{" "}
                kg
              </p>
            </div>
          </div>
        </div>
        {!!exercise.notes && (
          <div className="p-2 mt-2">
            <h3 className="">{exercise.notes}</h3>
          </div>
        )}
      </div>

      {/* SETS */}
      <div className="mt-2">
        {/* TABLE HEADER */}
        <div className="flex items-center gap-4">
          <div className="flex-1 grid grid-cols-12 text-xs font-semibold">
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              Set
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              Type
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              Reps
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              Weight
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
                {set.actualWeight}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExerciseCard
