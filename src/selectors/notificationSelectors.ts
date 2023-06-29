import { RootState } from "../store"
import { Notification } from "../types"

export const selectNotification = (state: RootState): Notification =>
  state.notification
