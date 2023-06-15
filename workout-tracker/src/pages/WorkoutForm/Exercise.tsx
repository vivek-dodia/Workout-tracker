import { Dispatch } from "react"
import * as types from "../../types"
import { CustomChip } from "../Exercises"
import Button from "../../components/Button"
import { DocumentDuplicateIcon, PlusIcon } from "@heroicons/react/24/outline"
import Dropdown from "../../components/Dropdown"
import DropdownSection from "../../components/Dropdown/DropdownSection"
import MoveUpOption from "../../components/Dropdown/MoveUpOption"
import MoveDownOption from "../../components/Dropdown/MoveDownOption"
import ReplaceOption from "../../components/Dropdown/ReplaceOption"
import DeleteOption from "../../components/Dropdown/DeleteOption"
import TextInput from "../../components/TextInput"

type ExerciseProps = {
  workoutExercise: types.FormWorkoutExercise
  user: types.User | null
  exerciseIndex: number
  exerciseCount: number
  moveExerciseUp: (exerciseIndex: number) => void
  moveExerciseDown: (exerciseIndex: number) => void
  removeExercise: (exerciseIndex: number) => void
  duplicateSet: (exerciseIndex: number, setIndex: number) => void
  addEmptySetForExercise: (exerciseIndex: number) => void
  setReplacingExercise: Dispatch<{ active: boolean; exerciseIndex: number }>
  updateExercise: (
    exerciseIndex: number,
    newExercise: types.FormWorkoutExercise
  ) => void
}

const Exercise = ({
  workoutExercise,
  user,
  exerciseIndex,
  exerciseCount,
  moveExerciseUp,
  moveExerciseDown,
  removeExercise,
  duplicateSet,
  addEmptySetForExercise,
  setReplacingExercise,
  updateExercise,
}: ExerciseProps) => {
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 py-1">
            <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-blue-500 rounded-full dark:bg-gray-600">
              <span className="font-medium dark:text-gray-300 text-white">
                {workoutExercise._exercise.name[0]}
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mt-1 flex gap-4 items-center">
                <p className="font-semibold">
                  {workoutExercise._exercise.name}
                </p>
                {workoutExercise._exercise.user === user?.id && <CustomChip />}
              </div>

              <p className="text-sm text-gray-600">
                {workoutExercise._exercise.muscleGroups.join(", ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4">
              <Button
                variant="secondary"
                onClick={() => addEmptySetForExercise(exerciseIndex)}
              >
                <div className="flex">
                  <PlusIcon className="mr-2 h-5 w-5" />
                  <h3>Add empty set</h3>
                </div>
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  duplicateSet(exerciseIndex, workoutExercise.sets.length - 1)
                }
              >
                <div className="flex">
                  <DocumentDuplicateIcon className="mr-2 h-5 w-5" />
                  <h3>Duplicate last set</h3>
                </div>
              </Button>
            </div>
            <Dropdown>
              <DropdownSection>
                <MoveUpOption
                  title="Move Exercise Up"
                  onClick={() => moveExerciseUp(exerciseIndex)}
                  disabled={exerciseIndex === 0}
                />
                <MoveDownOption
                  title="Move Exercise Down"
                  onClick={() => moveExerciseDown(exerciseIndex)}
                  disabled={exerciseIndex === exerciseCount - 1}
                />
              </DropdownSection>
              <DropdownSection>
                <ReplaceOption
                  title="Replace Exercise"
                  onClick={() =>
                    setReplacingExercise({ active: true, exerciseIndex })
                  }
                />
              </DropdownSection>
              <DropdownSection>
                <DeleteOption
                  title="Remove Exercise"
                  onClick={() => removeExercise(exerciseIndex)}
                />
              </DropdownSection>
            </Dropdown>
          </div>
        </div>

        <div>
          <TextInput
            simple
            placeholder="Notes..."
            value={workoutExercise.notes}
            onChange={({ target }) =>
              updateExercise(exerciseIndex, {
                ...workoutExercise,
                notes: target.value,
              })
            }
          />
        </div>
      </div>
    </>
  )
}

export default Exercise
