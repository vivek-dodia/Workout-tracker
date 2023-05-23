import { CheckIcon } from "@heroicons/react/24/outline"
import Tooltip from "../../components/Tooltip"
import * as types from "../../types"
import { classNames } from "../../utils/fn"
import Dropdown from "../../components/Dropdown"
import DropdownSection from "../../components/Dropdown/DropdownSection"
import AddOption from "../../components/Dropdown/AddOption"
import DeleteOption from "../../components/Dropdown/DeleteOption"

type SetsProps = {
  children: React.ReactNode
  exerciseIndex: number
  exerciseId: string
  exerciseType: types.ExerciseType
  sets: types.FormSet[]
  addEmptySetForExercise: (exerciseIndex: number) => void
  removeAllSetsForExercise: (exerciseIndex: number) => void
  updateAllSetsForExercise: (
    exerciseIndex: number,
    sets: types.FormSet[]
  ) => void
  fetchPreviousSet: (
    exerciseId: string,
    setIndex: number,
    setType: types.SetType
  ) => types.SetWithData | undefined
}

const Sets = ({
  children,
  exerciseIndex,
  exerciseType,
  exerciseId,
  sets,
  addEmptySetForExercise,
  removeAllSetsForExercise,
  updateAllSetsForExercise,
  fetchPreviousSet,
}: SetsProps) => {
  return (
    <>
      {/* TABLE */}
      <div className="mt-2">
        {/* TABLE HEADER */}
        <div className="flex items-center gap-4">
          <div className="flex-1 grid grid-cols-12 text-xs font-semibold text-gray-600">
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-1">
              Set
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              Type
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-3">
              Previous
            </div>
            {exerciseType === types.ExerciseType.repsAndBw ? (
              <div className="items-center justify-center p-1 grid h-12 w-full col-span-4">
                Reps
              </div>
            ) : (
              <>
                <div className="items-center justify-center p-1 grid h-12 w-full col-span-2">
                  Reps
                </div>
                <div className="items-center justify-center p-1 grid h-12 w-full col-span-2">
                  {exerciseType.split("&")[1]}
                </div>
              </>
            )}

            <div className="items-center justify-center p-1 grid h-12 w-full col-span-1">
              <Tooltip text="Mark all sets done">
                <CheckIcon
                  className={classNames(
                    "h-5 w-5 cursor-pointer",
                    sets.every(
                      (set) => set.status === types.SetStatusType.complete
                    )
                      ? "text-green-500"
                      : "text-gray-500"
                  )}
                  onClick={() =>
                    updateAllSetsForExercise(
                      exerciseIndex,
                      sets.map((set, i) => {
                        const previousSet = fetchPreviousSet(
                          exerciseId,
                          i,
                          set.type
                        )
                        return {
                          ...set,
                          reps:
                            set.reps || previousSet?.reps?.toString() || "0",
                          weight:
                            set.weight ||
                            previousSet?.weight?.toString() ||
                            "0",
                          status: types.SetStatusType.complete,
                        }
                      })
                    )
                  }
                />
              </Tooltip>
            </div>
          </div>

          <div>
            <Dropdown>
              <DropdownSection>
                <AddOption
                  title="Add empty set"
                  onClick={() => addEmptySetForExercise(exerciseIndex)}
                />
              </DropdownSection>
              <DropdownSection>
                <DeleteOption
                  title="Remove all sets"
                  onClick={() => removeAllSetsForExercise(exerciseIndex)}
                />
              </DropdownSection>
            </Dropdown>
          </div>
        </div>

        {children}
      </div>
    </>
  )
}

export default Sets