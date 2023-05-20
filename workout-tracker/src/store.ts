import { configureStore } from "@reduxjs/toolkit"
import { injectStore } from "./axios"

import userReducer from "./reducers/userReducer"
import notificationReducer from "./reducers/notificationReducer"
import sidebarReducer from "./reducers/sidebarReducer"
import headerTitleReducer from "./reducers/headerTitleReducer"
import exerciseReducer from "./reducers/exerciseReducer"
import workoutReducer from "./reducers/workoutReducer"

const store = configureStore({
  reducer: {
   user: userReducer,
   notification: notificationReducer,
   sidebar: sidebarReducer,
   headerTitle: headerTitleReducer,
   exercises: exerciseReducer,
   workouts: workoutReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
})

injectStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
