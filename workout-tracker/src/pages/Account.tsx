import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectUser } from "../selectors/userSelectors"
import Button from "../components/Button"
import Page from "../components/Layout/Page"
import TextInput from "../components/TextInput"
import { REGEX_INT } from "../utils/const"
import { updateUser } from "../reducers/userReducer"
import { setNotification } from "../reducers/notificationReducer"
import { NotificationType } from "../types"
import useNotify from "../hooks/useNotify"

const Account = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)!
  const [newBw, setNewBw] = useState(user.measurements.bodyweight.toFixed())
  const [msg, setMsg] = useState("")
  const { notify } = useNotify()

  return (
    <Page>
      <Page.Content>
        <div className="flex gap-4 items-end">
          <TextInput
            label="Bodyweight"
            placeholder="Kg"
            value={newBw}
            onChange={({ target }) =>
              setNewBw(
                REGEX_INT.test(target.value) || target.value === ""
                  ? target.value
                  : newBw
              )
            }
          />
          <div>
            <Button
              variant="success"
              onClick={() =>
                dispatch(
                  updateUser({
                    ...user,
                    measurements: {
                      ...user.measurements,
                      bodyweight: parseFloat(newBw),
                    },
                  })
                )
              }
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex gap-4 items-end">
          <TextInput
            label="Test notification"
            placeholder="message"
            value={msg}
            onChange={({ target }) => setMsg(target.value)}
          />
          <div>
            <Button variant="secondary" onClick={() => notify(msg)}>
              Notify
            </Button>
            <Button
              variant="success"
              onClick={() =>
                dispatch(
                  setNotification({
                    message: msg,
                    type: NotificationType.success,
                  })
                )
              }
            >
              Notify
            </Button>
            <Button
              variant="alert"
              onClick={() =>
                dispatch(
                  setNotification({
                    message: msg,
                    type: NotificationType.alert,
                  })
                )
              }
            >
              Notify
            </Button>
          </div>
        </div>
      </Page.Content>
    </Page>
  )
}

export default Account
