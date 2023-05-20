import { useEffect } from "react"
import Page from "../components/Layout/Page"

import { useLocation } from "react-router-dom"
import { useAppDispatch } from "../hooks"
import { setHeaderTitle } from "../reducers/headerTitleReducer"

/**
 *  SERVICES
 */

import exerciseService from "../services/exercises"
import workoutService from "../services/workouts"

const AdminTools = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(setHeaderTitle("Admin Tools"))
  }, [location])

  return (
    <div>
      <Page>
        <Page.Content>
          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1">
                <h4 className="font-bold">Exercises</h4>
              </div>
              <div className="col-span-3 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3>Init exercises for user.</h3>
                  <button
                    className="hover:bg-green-800 bg-green-500 text-white rounded-lg p-2"
                    onClick={() => exerciseService.init()}
                  >
                    Init User Exercises
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <h3>Clear exercise db (all but system exercises)</h3>
                  <button
                    className="hover:bg-red-800 bg-red-500 text-white rounded-lg p-2"
                    onClick={() => exerciseService.removeAll()}
                  >
                    Clear Exercises
                  </button>
                </div>
              </div>

              <div className="col-span-1">
                <h4 className="font-bold">Workouts</h4>
              </div>
              <div className="col-span-3 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3>Init workouts for current user</h3>
                  <button
                    className="hover:bg-green-800 bg-green-500 text-white rounded-lg p-2"
                    onClick={() => workoutService.init()}
                  >
                    Init workouts
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <h3>Clear workout DB</h3>
                  <button
                    className="hover:bg-red-800 bg-red-500 text-white rounded-lg p-2"
                    onClick={() => workoutService.removeAll()}
                  >
                    Clear workouts
                  </button>
                </div>
              </div>

              <div className="col-span-1">
                <h4 className="font-bold">System exercises</h4>
              </div>
              <div className="col-span-3 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3>Init system exercises</h3>
                  <button
                    className="hover:bg-green-800 bg-green-500 text-white rounded-lg p-2"
                    onClick={() => exerciseService.initSystem()}
                  >
                    Init system exercises
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <h3>Clear all exercises includin system</h3>
                  <button
                    className="hover:bg-red-800 bg-red-500 text-white rounded-lg p-2"
                    onClick={() => exerciseService.removeAllSystem()}
                  >
                    Clear System Exercises
                  </button>
                </div>
              </div>

            </div>
          </div>
        </Page.Content>
      </Page>
    </div>
  )
}

export default AdminTools
