import { CheckIcon } from "@heroicons/react/24/outline"
import * as types from "../../types"
import { REGEX_DECIMAL, REGEX_INT } from "../../utils/const"
import { classNames } from "../../utils/fn"
import Dropdown from "../../components/Dropdown"
import DropdownSection from "../../components/Dropdown/DropdownSection"
import MoveUpOption from "../../components/Dropdown/MoveUpOption"
import MoveDownOption from "../../components/Dropdown/MoveDownOption"
import DuplicateOption from "../../components/Dropdown/DuplicateOption"
import DeleteOption from "../../components/Dropdown/DeleteOption"

type SetProps = {
  set: types.FormSet
  exerciseIndex: number
  exerciseType: types.ExerciseType
  setIndex: number
  setCount: number
  exerciseId: string
  moveSetUp: (exerciseIndex: number, setIndex: number) => void
  moveSetDown: (exerciseIndex: number, setIndex: number) => void
  duplicateSet: (exerciseIndex: number, setIndex: number) => void
  removeSet: (exerciseIndex: number, setIndex: number) => void
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    newSet: types.FormSet
  ) => void
  fetchPreviousSet: (
    exerciseId: string,
    setIndex: number,
    setType: types.SetType
  ) => types.SetWithData | undefined
}

const Set = ({
  set,
  exerciseId,
  setIndex,
  exerciseIndex,
  setCount,
  exerciseType,
  moveSetUp,
  moveSetDown,
  duplicateSet,
  removeSet,
  updateSet,
  fetchPreviousSet,
}: SetProps) => {
  const previousSet = fetchPreviousSet(exerciseId, setIndex, set.type)
  const toggleType = () => {
    const { warmup, working, amrap } = types.SetType
    const type =
      set.type === working ? warmup : set.type === warmup ? amrap : working
    updateSet(exerciseIndex, setIndex, {
      ...set,
      type,
      status: types.SetStatusType.incomplete,
    })
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className={classNames(
          "flex-1 grid grid-cols-12 text-xs font-semibold",
          set.status === types.SetStatusType.complete
            ? "bg-green-500 text-white"
            : set.status === types.SetStatusType.error
            ? "bg-red-500 text-white"
            : "bg-inherit "
        )}
      >
        <div className="items-center justify-center p-1 grid h-12 w-full col-span-1 select-none">
          {setIndex + 1}
        </div>
        <div className="p-1 grid h-12 w-full col-span-3 select-none">
          <button className="flex-1" onClick={toggleType}>
            {set.type}
          </button>
        </div>
        <div className="p-1 grid h-12 w-full col-span-3 select-none">
          <button
            className={classNames(
              "flex-1 font-normal",
              set.status === types.SetStatusType.incomplete
                ? "text-gray-500"
                : "text-gray-300"
            )}
            onClick={() =>
              !!previousSet &&
              updateSet(exerciseIndex, setIndex, {
                ...set,
                status: types.SetStatusType.incomplete,
                weight: previousSet.weight.toString(),
                reps: previousSet.reps.toString(),
              })
            }
          >
            <h3>
              {!!previousSet && exerciseType === types.ExerciseType.repsAndBw
                ? `${previousSet.reps}`
                : !!previousSet
                ? `${previousSet.reps} x ${previousSet.weight}kg`
                : "-"}
            </h3>
          </button>
        </div>
        {exerciseType === types.ExerciseType.repsAndBw ? (
          <div className="items-center justify-center p-1 grid h-12 w-full col-span-4">
            <input
              className={classNames(
                "w-full h-full bg-inherit px-2 text-center outline-none",
                set.status === types.SetStatusType.incomplete
                  ? "placeholder-gray-500"
                  : "placeholder-gray-300"
              )}
              value={set.reps}
              placeholder={previousSet?.reps?.toString() || "-"}
              onChange={({ target }) =>
                updateSet(exerciseIndex, setIndex, {
                  ...set,
                  status: types.SetStatusType.incomplete,
                  weight: "0",
                  reps:
                    REGEX_INT.test(target.value) || target.value === ""
                      ? target.value
                      : set.reps,
                })
              }
            />
          </div>
        ) : (
          <>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-2">
              <input
                className={classNames(
                  "w-full h-full bg-inherit px-2 text-center outline-none placeholder:font-normal",
                  set.status === types.SetStatusType.incomplete
                    ? "placeholder-gray-500"
                    : "placeholder-gray-300"
                )}
                value={set.reps}
                placeholder={previousSet?.reps?.toString() || "-"}
                onChange={({ target }) =>
                  updateSet(exerciseIndex, setIndex, {
                    ...set,
                    status: types.SetStatusType.incomplete,
                    reps:
                      REGEX_INT.test(target.value) || target.value === ""
                        ? target.value
                        : set.reps,
                  })
                }
              />
            </div>
            <div className="items-center justify-center p-1 grid h-12 w-full col-span-2">
              <input
                className={classNames(
                  "w-full h-full bg-inherit px-2 text-center outline-none placeholder:font-normal",
                  set.status === types.SetStatusType.incomplete
                    ? "placeholder-gray-500"
                    : "placeholder-gray-300"
                )}
                value={set.weight}
                placeholder={previousSet?.weight?.toString() || "-"}
                onChange={({ target }) =>
                  updateSet(exerciseIndex, setIndex, {
                    ...set,
                    status: types.SetStatusType.incomplete,
                    weight:
                      REGEX_DECIMAL.test(target.value) || target.value === ""
                        ? target.value
                        : set.weight,
                  })
                }
              />
            </div>
          </>
        )}
        <div className="relative items-center justify-center p-1 grid h-12 w-full col-span-1 select-none">
          <CheckIcon
            className={classNames(
              "h-5 w-5 cursor-pointer",
              set.status === types.SetStatusType.incomplete
                ? "text-gray-500"
                : "text-white"
            )}
            onClick={() =>
              updateSet(exerciseIndex, setIndex, {
                ...set,
                reps: set.reps || previousSet?.reps?.toString() || "0",
                weight: set.weight || previousSet?.weight?.toString() || "0",
                status:
                  set.status === types.SetStatusType.complete
                    ? types.SetStatusType.incomplete
                    : types.SetStatusType.complete,
              })
            }
          />
        </div>
      </div>

      <div>
        <Dropdown>
          <DropdownSection>
            <MoveUpOption
              title="Move Set Up"
              onClick={() => moveSetUp(exerciseIndex, setIndex)}
              disabled={setIndex === 0}
            />
            <MoveDownOption
              title="Move Set Down"
              onClick={() => moveSetDown(exerciseIndex, setIndex)}
              disabled={setIndex === setCount - 1}
            />
          </DropdownSection>
          <DropdownSection>
            <DuplicateOption
              title="Duplicate Set"
              onClick={() => duplicateSet(exerciseIndex, setIndex)}
            />
          </DropdownSection>
          <DropdownSection>
            <DeleteOption
              title="Remove Set"
              onClick={() => removeSet(exerciseIndex, setIndex)}
            />
          </DropdownSection>
        </Dropdown>
      </div>
    </div>
  )
}

export default Set
