import { useAppDispatch } from "."
import { setNotification } from "../reducers/notificationReducer"
import { NotificationType } from "../types"

const useNotify = () => {
  const dispatch = useAppDispatch()

  const notify = (
    message: string,
    type = NotificationType.info,
    duration = 5
  ): void => {
    dispatch(setNotification({ message, type }, duration))
  }

  return { notify }
}

export default useNotify
