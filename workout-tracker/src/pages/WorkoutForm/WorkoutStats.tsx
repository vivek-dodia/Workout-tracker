import { useMemo } from "react"
import useStopwatch from "../../hooks/useStopwatch"
import { FormWorkout } from "../../types"
import { getWeight } from "../../utils/fn"

type WorkoutStatsProps = {
  workout: FormWorkout
  startTime?: number
}

const WorkoutStats = ({ workout, startTime }: WorkoutStatsProps) => {
  const { timeString } = useStopwatch(startTime || Date.now())

  const sets = useMemo(
    () =>
      workout.exercises
        .map((exercise) =>
          exercise.sets.map((set) => ({
            ...set,
            type: exercise._exercise.type,
            bwFactor: exercise._exercise.bodyweightFactor,
          }))
        )
        .flat(),
    [workout.exercises]
  )

  const totalVolume = useMemo(
    () =>
      sets
        .map(
          (set) =>
            parseFloat(set.reps) *
              getWeight(set.type, set.bwFactor, parseFloat(set.weight)) || 0
        )
        .reduce((a, b) => a + b, 0),
    [sets]
  )

  return (
    <div className=" text-sm">
      <div className="flex gap-4 lg:gap-8">
        {!!startTime && (
          <div className="flex flex-col gap-1">
            <h3 className="text-xs text-gray-500">Duration</h3>
            <h2>{timeString}</h2>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-gray-500">Volume</h3>
          <h2>{totalVolume || 0} kg</h2>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-gray-500">Sets</h3>
          <h2>{sets.length}</h2>
        </div>
      </div>
    </div>
  )
}

export default WorkoutStats
