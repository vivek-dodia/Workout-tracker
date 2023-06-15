import { useState, useEffect, Dispatch } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectUser } from "../selectors/userSelectors"
import Button from "../components/Button"
import Page from "../components/Layout/Page"
import TextInput from "../components/TextInput"
import { REGEX_DECIMAL, REGEX_EMAIL } from "../utils/const"
import { removeUser, updateUser } from "../reducers/userReducer"
import { NotificationType, User } from "../types"
import useNotify from "../hooks/useNotify"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { useLocation, useNavigate } from "react-router-dom"
import userService from "../services/users"
import Spinner from "../components/Spinner"
import Confirmation from "../components/Confirmation"

type DeleteAccountProps = {
  deleteAccount: (setButtonLoading: Dispatch<boolean>) => void
}

const DeleteAccount = ({ deleteAccount }: DeleteAccountProps) => {
  const [confirmed, setConfirmed] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)

  return (
    <>
      <div className="bg-white px-4 py-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <h4 className="font-bold">Delete Account</h4>
          </div>
          <div className="col-span-3 flex flex-col gap-4">
            <div className="flex justify-between items-center ">
              <h3>
                Delete your account and all of your source data. This is
                irreversible.
              </h3>
              <div className="flex gap-4">
                <Button
                  variant="alert"
                  onClick={() =>
                    confirmed ? setConfirmationOpen(true) : setConfirmed(true)
                  }
                >
                  <div className="flex gap-2 items-center">
                    {buttonLoading && <Spinner />}
                    <h3>Delete account</h3>
                  </div>
                </Button>
                {confirmed && (
                  <Button variant="neutral" onClick={() => setConfirmed(false)}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Confirmation
        show={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={() => deleteAccount(setButtonLoading)}
        title={`Delete your account?`}
        message="This will delete the account and all related data. This action is irreversible."
      />
    </>
  )
}

type PasswordProps = {
  updatePassword: (newPassword: string) => void
  notify: (message: string, type?: NotificationType, duration?: number) => void
}

const Password = ({ updatePassword, notify }: PasswordProps) => {
  const [change, setChange] = useState(false)
  const [newPassword, setNewPassword] = useState("")

  const validateAndUpdate = () => {
    if (!newPassword || newPassword.length < 5) {
      notify("Password is too short!", NotificationType.alert)
      return
    }

    updatePassword(newPassword)
    setChange(false)
    setNewPassword("")
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <h4 className="font-bold">Change Password</h4>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <div>
            <h4 className="font-medium leading-6">Password</h4>
            <div className="flex items-center gap-4">
              <TextInput
                className="flex-1"
                type="password"
                disabled={!change}
                value={change ? newPassword : "passwordPlaceholder"}
                onChange={({ target }) => setNewPassword(target.value)}
              />
              {change ? (
                <div className="gap-2 flex">
                  <button
                    className="mt-2 py-2 px-4 rounded-md hover:bg-gray-200"
                    onClick={() => {
                      setChange(false)
                      setNewPassword("")
                    }}
                  >
                    <h3 className="font-medium text-sm">Cancel</h3>
                  </button>
                  <button
                    className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                    onClick={validateAndUpdate}
                  >
                    <h3 className="font-medium text-sm">Save</h3>
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 py-2 px-4 rounded-md hover:bg-gray-200"
                  onClick={() => {
                    setChange(true)
                  }}
                >
                  <h3 className="font-medium text-sm">Change</h3>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type EmailProps = {
  userEmail: string
  updateEmail: (newEmail: string) => void
  notify: (message: string, type?: NotificationType, duration?: number) => void
}

const Email = ({ userEmail, updateEmail, notify }: EmailProps) => {
  const [change, setChange] = useState(false)
  const [newEmail, setNewEmail] = useState(userEmail)

  const validateAndUpdate = async () => {
    if (newEmail === userEmail) {
      setChange(false)
      return
    }

    const isEmail = REGEX_EMAIL.test(newEmail)

    if (!isEmail) {
      notify("Invalid value for email!", NotificationType.alert)
      return
    }

    const existingUser = await userService.checkExistingEmail(newEmail)

    if (existingUser) {
      notify("Email already exists", NotificationType.alert)
      return
    }

    updateEmail(newEmail)
    setChange(false)
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <h4 className="font-bold">Change Email</h4>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <div>
            <h4 className="font-medium leading-6">Email</h4>
            <div className="flex items-center gap-4">
              <TextInput
                type="email"
                className="flex-1"
                disabled={!change}
                value={newEmail}
                onChange={({ target }) => setNewEmail(target.value)}
              />
              {change ? (
                <div className="gap-2 flex">
                  <button
                    className="mt-2 py-2 px-4 rounded-md hover:bg-gray-200"
                    onClick={() => {
                      setChange(false)
                      setNewEmail(userEmail)
                    }}
                  >
                    <h3 className="font-medium text-sm">Cancel</h3>
                  </button>
                  <button
                    className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                    onClick={validateAndUpdate}
                  >
                    <h3 className="font-medium text-sm">Save</h3>
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 py-2 px-4 rounded-md hover:bg-gray-200"
                  onClick={() => {
                    setChange(true)
                  }}
                >
                  <h3 className="font-medium text-sm">Change</h3>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type UsernameProps = {
  userUsername: string
  updateUsername: (newUsername: string) => void
  notify: (message: string, type?: NotificationType, duration?: number) => void
}

const Username = ({ userUsername, updateUsername, notify }: UsernameProps) => {
  const [change, setChange] = useState(false)
  const [newUsername, setNewUsername] = useState(userUsername)

  const validateAndUpdate = async () => {
    if (newUsername === userUsername) {
      setChange(false)
      return
    }

    const existingUser = await userService.checkExistingUsername(newUsername)

    if (existingUser) {
      notify("Username already exists", NotificationType.alert)
      return
    }

    updateUsername(newUsername)
    setChange(false)
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <h4 className="font-bold">Change Username</h4>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <div>
            <h4 className="font-medium leading-6">Username</h4>
            <div className="flex items-center gap-4">
              <TextInput
                className="flex-1"
                disabled={!change}
                value={newUsername}
                onChange={({ target }) => setNewUsername(target.value)}
              />
              {change ? (
                <div className="gap-2 flex">
                  <button
                    className="mt-2 py-2 px-4 rounded-md hover:bg-gray-200"
                    onClick={() => {
                      setChange(false)
                      setNewUsername(userUsername)
                    }}
                  >
                    <h3 className="font-medium text-sm">Cancel</h3>
                  </button>
                  <button
                    className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                    onClick={validateAndUpdate}
                  >
                    <h3 className="font-medium text-sm">Save</h3>
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 py-2 px-4 rounded-md hover:bg-gray-200"
                  onClick={() => {
                    setChange(true)
                  }}
                >
                  <h3 className="font-medium text-sm">Change</h3>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type BodyweightProps = {
  userBodyweight: string
  updateBodyweight: (newBodyweight: number) => void
  notify: (message: string, type?: NotificationType, duration?: number) => void
}

const Bodyweight = ({
  userBodyweight,
  updateBodyweight,
  notify,
}: BodyweightProps) => {
  const [change, setChange] = useState(false)
  const [newBodyweight, setNewBodyweight] = useState(userBodyweight)

  const validateAndUpdate = () => {
    const parsedBodyweight = parseFloat(newBodyweight)

    if (
      !newBodyweight ||
      !isFinite(parsedBodyweight) ||
      parsedBodyweight <= 0
    ) {
      notify("Invalid value for bodyweight", NotificationType.alert)
      return
    }

    updateBodyweight(parsedBodyweight)
    setChange(false)
  }

  return (
    <div className="bg-white px-4 py-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <h4 className="font-bold">Change Bodyweight</h4>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <div>
            <h4 className="font-medium leading-6">Bodyweight (kg)</h4>
            <div className="flex items-center gap-4">
              <TextInput
                placeholder="Kg"
                className="flex-1"
                disabled={!change}
                value={newBodyweight}
                onChange={({ target }) =>
                  setNewBodyweight(
                    REGEX_DECIMAL.test(target.value) || target.value === ""
                      ? target.value
                      : newBodyweight
                  )
                }
              />
              {change ? (
                <div className="gap-2 flex">
                  <button
                    className="mt-2 py-2 px-4 rounded-md hover:bg-gray-200"
                    onClick={() => {
                      setChange(false)
                      setNewBodyweight(userBodyweight)
                    }}
                  >
                    <h3 className="font-medium text-sm">Cancel</h3>
                  </button>
                  <button
                    className="mt-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500"
                    onClick={validateAndUpdate}
                  >
                    <h3 className="font-medium text-sm">Save</h3>
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 py-2 px-4 rounded-md hover:bg-gray-200"
                  onClick={() => {
                    setChange(true)
                  }}
                >
                  <h3 className="font-medium text-sm">Change</h3>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Account = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector(selectUser)!
  const { notify } = useNotify()

  useEffect(() => {
    dispatch(setHeaderTitle("Account"))
  }, [location])

  if (!user) return null

  const updateEmail = (newEmail: string) => {
    if (newEmail === user.email) {
      notify("Updated email!", NotificationType.success)
      return
    }

    const newUser: User = {
      ...user,
      email: newEmail,
    }

    dispatch(updateUser(newUser))
      .then(() => notify("Updated email!", NotificationType.success))
      .catch(() => {
        notify("Something went wrong", NotificationType.alert)
      })
  }

  const updatePassword = (newPassword: string) => {
    userService
      .updatePassword(user.id, { password: newPassword })
      .then(() => notify("Updated password!", NotificationType.success))
      .catch(() => {
        notify("Something went wrong", NotificationType.alert)
      })
  }

  const updateUsername = (newUsername: string) => {
    if (newUsername === user.username) {
      notify("Updated username!", NotificationType.success)
      return
    }

    const newUser: User = {
      ...user,
      username: newUsername,
    }

    dispatch(updateUser(newUser))
      .then(() => notify("Updated username!", NotificationType.success))
      .catch(() => {
        notify("Something went wrong", NotificationType.alert)
      })
  }

  const updateBodyweight = (newBodyweight: number) => {
    if (newBodyweight === user.measurements.bodyweight) {
      notify("Updated bodyweight!", NotificationType.success)
      return
    }

    const newUser = {
      ...user,
      measurements: {
        ...user.measurements,
        bodyweight: newBodyweight,
      },
    }

    dispatch(updateUser(newUser))
      .then(() => notify("Updated bodyweight!", NotificationType.success))
      .catch(() => {
        notify("Something went wrong", NotificationType.alert)
      })
  }

  const deleteAccount = (setButtonLoading: Dispatch<boolean>) => {
    setButtonLoading(true)
    dispatch(removeUser(user.id))
      .then(() => {
        navigate("/signin")
        notify("Account deleted!", NotificationType.success)
      })
      .catch(() => {
        notify("Something went wrong", NotificationType.alert)
      })
      .finally(() => setButtonLoading(false))
  }

  return (
    <Page>
      <Page.Content>
        <div className="mt-8">
          <div className="grid space-y-8">
            <Bodyweight
              userBodyweight={user.measurements.bodyweight.toString()}
              updateBodyweight={updateBodyweight}
              notify={notify}
            />
            <div className="bg-white px-4 py-6 rounded-lg shadow-md space-y-8">
              <Username
                userUsername={user.username}
                updateUsername={updateUsername}
                notify={notify}
              />
              <Email
                userEmail={user.email}
                updateEmail={updateEmail}
                notify={notify}
              />
              <Password updatePassword={updatePassword} notify={notify} />
            </div>
            <DeleteAccount deleteAccount={deleteAccount} />
          </div>
        </div>
      </Page.Content>
    </Page>
  )
}

export default Account
