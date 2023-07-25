import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import ExerciseCard from "../../components/ExerciseCard"
import {
  mockUser as user,
  mockWorkoutExercise1 as exercise,
} from "../../mockData"
import { BrowserRouter as Router } from "react-router-dom"

describe("ExerciseCard component", () => {
  it("renders exercise name and muscle groups", () => {
    render(
      <Router>
        <ExerciseCard exercise={exercise} user={user} />
      </Router>
    )

    const exerciseNameElement = screen.getByText(exercise._exercise.name)
    expect(exerciseNameElement).toBeInTheDocument()

    for (const group of exercise._exercise.muscleGroups) {
      const muscleGroupsElement = screen.getByText((content) =>
        content.includes(group)
      )
      expect(muscleGroupsElement).toBeInTheDocument()
    }
  })

  it("renders exercise notes when available", () => {
    render(
      <Router>
        <ExerciseCard exercise={exercise} user={user} />
      </Router>
    )

    if (exercise.notes) {
      const notesElement = screen.getByText(exercise.notes)
      expect(notesElement).toBeInTheDocument()
    }
  })
})
