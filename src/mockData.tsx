import * as types from "./types"

export const mockUser: types.User = {
  id: "user123",
  token: "userToken",
  username: "john_doe",
  email: "john.doe@example.com",
  measurements: {
    bodyweight: 75,
  },
}

export const mockWorkoutExercise1: types.WorkoutExercise = {
  _exercise: {
    id: "exercise1",
    name: "Bench Press",
    user: mockUser.id,
    muscleGroups: [types.MuscleGroup.chest],
    equipment: types.Equipment.barbell,
    type: types.ExerciseType.repsAndKg,
    bodyweightFactor: 0.85,
  },
  notes: "Performed well today.",
  sets: [
    {
      type: types.SetType.working,
      reps: 8,
      weight: 100,
      actualWeight: 85, // 85% of 100 due to bodyweightFactor
    },
    {
      type: types.SetType.working,
      reps: 8,
      weight: 100,
      actualWeight: 85,
    },
    {
      type: types.SetType.working,
      reps: 8,
      weight: 100,
      actualWeight: 85,
    },
  ],
}

export const mockWorkoutExercise2: types.WorkoutExercise = {
  _exercise: {
    id: "exercise2",
    name: "Squat",
    user: mockUser.id,
    muscleGroups: [types.MuscleGroup.quads],
    equipment: types.Equipment.barbell,
    type: types.ExerciseType.repsAndKg,
    bodyweightFactor: 0.7,
  },
  notes: "Felt a bit tired during squats.",
  sets: [
    {
      type: types.SetType.working,
      reps: 6,
      weight: 120,
      actualWeight: 84, // 84% of 120 due to bodyweightFactor
    },
    {
      type: types.SetType.working,
      reps: 6,
      weight: 120,
      actualWeight: 84,
    },
    {
      type: types.SetType.working,
      reps: 6,
      weight: 120,
      actualWeight: 84,
    },
  ],
}

export const mockWorkout: types.Workout = {
  id: "workout123",
  user: mockUser.id,
  name: "Upper Body Day",
  notes: "Great workout today!",
  date: "2023-07-25",
  duration: 60,
  exercises: [mockWorkoutExercise1, mockWorkoutExercise2],
}
