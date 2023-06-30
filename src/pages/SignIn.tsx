import { useAppDispatch } from "../hooks"
import { signIn } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import { Credentials, NotificationType } from "../types"
import { setNotification } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useState } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

const SignIn = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (credentials: Credentials): void => {
    setButtonLoading(true)

    dispatch(signIn(credentials))
      .then((username) => {
        dispatch(
          setNotification({
            message: `Welcome ${username}!`,
            type: NotificationType.success,
          })
        )
        navigate("/app/dashboard")
      })
      .catch((error) => {
        let message: string = "Something went wrong."
        if ("response" in error) message = error.response.data.error
        else if (error instanceof Error) message = error.message
        dispatch(setNotification({ message, type: NotificationType.alert }))
      })
      .finally(() => setButtonLoading(false))
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <img className="mx-auto h-10 w-auto" src="logo.png" />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <div>
                  <h3 className="text-sm text-red-500">
                    {errors.email?.message}
                  </h3>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  {/* <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a> */}
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <div>
                  <h3 className="text-sm text-red-500">
                    {errors.password?.message}
                  </h3>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <div className="flex gap-2 items-center">
                  {buttonLoading && <Spinner />}
                  <h3>Sign in</h3>
                </div>
              </button>
            </div>
          </form>

          <div className="mt-10 bg-slate-50 rounded-md py-2 px-4">
            <div className="flex items-center gap-4">
              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              <h3 className="text-sm">
                You can use{" "}
                <span className="font-semibold">demo@example.com</span> and
                password <span className="font-semibold">Password123!</span>
              </h3>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn
