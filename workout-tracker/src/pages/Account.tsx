import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectUser } from "../selectors/userSelectors"
import Button from "../components/Button"
import Page from "../components/Layout/Page"
import TextInput from "../components/TextInput"
import { REGEX_INT } from "../utils/const"
import { updateUser } from "../reducers/userReducer"

const Account = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)!
  const [newBw, setNewBw] = useState(user.measurements.bodyweight.toFixed())

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
      </Page.Content>
    </Page>
  )
}

export default Account
