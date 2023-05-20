import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const selectId = createSelector(
  [(_: RootState, id: string): string => id],
  (id: string): string => {
    return id
  }
)

export const selectQuery = createSelector(
  [(_: RootState, query: string): string => query],
  (query: string): string => {
    return query
  }
)
