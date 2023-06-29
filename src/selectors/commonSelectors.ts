import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Grouping } from "../types"

export const selectId = createSelector(
  [(_state: RootState, id: string): string => id],
  (id: string): string => {
    return id
  }
)

export const selectGrouping = createSelector(
  [(_state: RootState, grouping: Grouping): Grouping => grouping],
  (grouping: Grouping): Grouping => {
    return grouping
  }
)

export const selectIdAndGrouping = createSelector(
  [(_state: RootState, _id: string, grouping: Grouping): Grouping => grouping],
  (grouping: Grouping): Grouping => {
    return grouping
  }
)

export const selectQuery = createSelector(
  [(_state: RootState, query: string): string => query],
  (query: string): string => {
    return query
  }
)
