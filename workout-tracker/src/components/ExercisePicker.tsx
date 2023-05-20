import { Dispatch, useState } from "react"
import { EMPTY_SET } from "../utils/const"
import { Exercise, FormWorkoutExercise } from "../types"
import Exercises from "../pages/Exercises"

type Props = {
  onSelection: (selectedExercises: FormWorkoutExercise[]) => void
  setSelectingExercises: Dispatch<boolean>
}

const ExercisePicker = ({ setSelectingExercises, onSelection }: Props) => {
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

  const selectExercises = () => {
    const selected: FormWorkoutExercise[] = selectedExercises.map((exercise) => ({
      _exercise: exercise,
      notes: "",
      sets: [EMPTY_SET],
    }))

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
        selectedCount: selectedExercises.length,
      }}
    />
  )
}

export default ExercisePicker
