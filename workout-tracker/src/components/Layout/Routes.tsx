import { Routes as RRDRoutes, Route } from "react-router-dom"
import Dashboard from "../../pages/Dashboard"
import NoMatch from "../../pages/NoMatch/NoMatch"
import Exercises from "../../pages/Exercises"
import ExerciseDetails from "../../pages/ExerciseDetails"
import AdminTools from "../../pages/AdminTools"
import Workouts from "../../pages/Workouts"
import WorkoutDetails from "../../pages/WorkoutDetails"
import WorkoutForm from "../../pages/WorkoutForm/WorkoutForm"
import Account from "../../pages/Account"
import ExerciseForm from "../../pages/ExerciseForm"

const Routes = () => {
  return (
    <>
      <RRDRoutes>
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/account">
          <Route index element={<Account />} />
        </Route>
        <Route path="/exercises">
          <Route index element={<Exercises />} />
          <Route path=":id" element={<ExerciseDetails />} />
          <Route path="new" element={<ExerciseForm />} /> 
          <Route path="update/:id" element={<ExerciseForm updating />} />
          <Route path="duplicate/:id" element={<ExerciseForm duplicating />} />
        </Route>
        <Route path="/workouts">
          <Route index element={<Workouts />} />
          <Route path=":id" element={<WorkoutDetails />} />
          <Route path="new" element={<WorkoutForm />} />
          <Route path="update/:id" element={<WorkoutForm updating />} />
          <Route path="duplicate/:id" element={<WorkoutForm duplicating />} />
        </Route>

        <Route path="/admin">
          <Route index element={<AdminTools />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </RRDRoutes>
    </>
  )
}

export default Routes
