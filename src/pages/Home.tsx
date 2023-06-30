import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks"
import { selectUser } from "../selectors/userSelectors"
import { ArrowSmallRightIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import statisticsService from "../services/statistics"
import { useEffect, useState } from "react"
import { Statistics } from "../types"
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid"

const LiveNumbers = () => {
  const [stats, setStats] = useState<Statistics | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await statisticsService.getAll()
      setStats(stats)
    }

    fetchStats()
  }, [])

  if (!stats) return null

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-center pt-20 pb-20 max-w-screen-lg mx-auto text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Live Numbers
        </h1>

        <div className="mt-14 flex gap-y-4 flex-col md:flex-row w-full justify-between text-center">
          <div className="px-6 py-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {stats.userCount}
            </h2>
            <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold">
              Users
            </h3>
          </div>
          <div className="px-6 py-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {stats.workoutCount}
            </h2>
            <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold">
              Workouts
            </h3>
          </div>
          <div className="px-6 py-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {Math.ceil(stats.liftCount / 1000)}k
            </h2>
            <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold">
              Lifts
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const user = useAppSelector(selectUser)

  return (
    <>
      <div className="">
        <header className="z-50 sticky w-full top-0 bg-white border-b">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center gap-4">
              <Link to="/" className="flex gap-4 items-center p-4">
                <img src="/logo.png" className="h-6 w-6" />
                <h1 className="text-xl font-medium text-zinc-800">
                  Workout Tracker
                </h1>
              </Link>

              <div className="flex gap-1 font-medium text-sm text-zinc-800 hover:text-zinc-950">
                {!!user ? (
                  <>
                    <Link to="/app/dashboard" className="px-4 py-2">
                      App
                    </Link>
                    <div>
                      <p className="px-4 py-2 font-normal">
                        Signed in as {user.username}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="px-4 py-2">
                      Sign In
                    </Link>

                    <Link to="/signup" className="px-4 py-2">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* LANDING */}
        <div className="h-screen">
          <div className="bg-[url('/gym.jpg')] bg-no-repeat bg-cover bg-center h-3/4 md:h-full">
            <div className="flex text-center h-full backdrop-brightness-50">
              <div className="flex-1 flex flex-col items-center justify-center gap-2 container mx-auto px-6 text-white">
                <h1 className="text-5xl sm:text-8xl md:text-9xl font-bold">
                  Track, Train,
                </h1>
                <h1 className="text-5xl sm:text-8xl md:text-9xl font-bold">
                  Transform
                </h1>

                <p className="mt-4 sm:mt-8 text-xl sm:text-2xl md:text-3xl font-medium">
                  Maximize your workouts and see real progress.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LOG SECTION */}
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-10 py-20 sm:py-40 max-w-screen-xl mx-auto px-6">
          <div className="w-full md:w-2/3 ">
            <img
              src="/workout-tracker-logger-demo.gif"
              className="rounded-3xl shadow-lg"
            />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              Track your workouts
            </h3>
            <p className="mt-4 sm:mt-8 sm:text-lg md:text-xl font-medium">
              Track your workouts by easily logging them with Workout Tracker
            </p>
          </div>
        </div>

        {/* PROGRESS SECTION */}
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-10 py-20 sm:py-40 max-w-screen-xl mx-auto px-6">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              Visualize your progress
            </h3>
            <p className="mt-4 sm:mt-8 sm:text-lg md:text-xl font-medium">
              Keep track of your best sets, max 1RM, top volumes, and more
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <img
              src="/workout-tracker-stats-demo.gif"
              className="rounded-3xl shadow-lg"
            />
          </div>
        </div>

        <LiveNumbers />

        {/* FEATURES */}
        <div className="flex flex-col items-center justify-center py-20 sm:py-40 max-w-screen-md mx-auto text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Everything you need
          </h1>

          <p className="mt-8 text-lg md:text-2xl font-medium text-center">
            Workout Tracker has all the features. Track and record workouts, Log
            exercise details such as sets, reps, and weights, Record and analyze
            workout details, Create custom exercises or use the large collection
            of predefined exercises, Visualize workouts with statistics and
            graphs, and much more.
          </p>

          <Link to="/signin" className="mt-10 flex gap-1 items-center">
            <h3 className="font-semibold">Get started</h3>
            <ArrowSmallRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {/* FOOTER */}
        <footer className="">
          <div className="py-8 container mx-auto flex justify-between gap-2 px-10 items-center">
            <h3 className="text-sm text-zinc-600">
              Copyright © 2023 Ville Prami. All Rights Reserved.
            </h3>
            <div className="flex gap-4">
              <Link
                to="https://villeprami.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeAltIcon className="h-6 w-6 text-zinc-500 transition hover:text-zinc-600" />
              </Link>
              <Link
                to="https://github.com/PrVille"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
                  ></path>
                </svg>
              </Link>
              <Link
                to="https://www.linkedin.com/in/ville-prami/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600"
                >
                  <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
