import { Dispatch, useState } from "react"
import { EMPTY_SET } from "../../utils/const"
import { Exercise, FormWorkoutExercise } from "../../types"
import Exercises from "../Exercises"

type Props = {
  replacingExercise: {
    active: boolean
    exerciseIndex: number
  }
  onSelection: (selectedExercises: FormWorkoutExercise[]) => void
  setSelectingExercises: Dispatch<boolean>
  setReplacingExercise: Dispatch<{ active: boolean; exerciseIndex: number }>
  onReplace: (exerciseIndex: number, exercise: Exercise) => void
}

const ExercisePicker = ({
  replacingExercise,
  setReplacingExercise,
  setSelectingExercises,
  onSelection,
  onReplace,
}: Props) => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])

  const toggleSelected = (exercise: Exercise) => {
    if (selectedExercises.includes(exercise)) {
      const i = selectedExercises.findIndex((e) => e.id === exercise.id)
      setSelectedExercises([
        ...selectedExercises.slice(0, i),
        ...selectedExercises.slice(i + 1),
      ])
    } else {
      setSelectedExercises([...selectedExercises, exercise])
    }
  }

  const replaceExercise = (exerciseIndex: number, exercise: Exercise) => {
    onReplace(exerciseIndex, exercise)
    setReplacingExercise({ active: false, exerciseIndex: -1 })
  }

  const selectExercises = () => {
    const selected: FormWorkoutExercise[] = selectedExercises.map(
      (exercise) => ({
        _exercise: exercise,
        notes: "",
        sets: [EMPTY_SET],
      })
    )

    onSelection(selected)
    setSelectingExercises(false)
  }

  const isSelected = (exercise: Exercise) =>
    selectedExercises.includes(exercise)

  return (
    <Exercises
      asPicker={{
        onSelection,
        setSelectingExercises,
        selectExercises,
        toggleSelected,
        isSelected,
        replaceExercise,
        setReplacingExercise,
        selectedCount: selectedExercises.length,
        replacingExercise,
      }}
    />
  )
}

export default ExercisePicker
