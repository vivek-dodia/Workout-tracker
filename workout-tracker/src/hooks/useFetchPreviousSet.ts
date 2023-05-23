import { useAppSelector } from "."
import { selecSetsWithDataSortedByDescDate } from "../selectors/setSelectors"
import { SetType } from "../types"

const useFetchPreviousSet = () => {
  const sets = useAppSelector(selecSetsWithDataSortedByDescDate)

  const fetchPreviousSet = (
    exerciseId: string,
    setIndex: number,
    setType: SetType
  ) => {
    const setsByExerciseId = sets.filter((set) => set.exerciseId === exerciseId)
    const set = setsByExerciseId.find(
      (set) => set.setIndex === setIndex && set.type === setType
    )
    return set
  }

  return { fetchPreviousSet }
}

export default useFetchPreviousSet
