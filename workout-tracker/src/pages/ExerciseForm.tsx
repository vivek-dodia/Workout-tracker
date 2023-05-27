import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import Page from "../components/Layout/Page"
import GoBackButton from "../components/GoBackButton"
import Button from "../components/Button"
import {
  EMPTY_EXERCISE,
  EQUIPMENT_OPTIONS,
  MUSCLE_GROUP_OPTIONS,
  EXERCISE_TYPE_OPTIONS,
  REGEX_INT_0_TO_100,
} from "../utils/const"
import * as types from "../types"
import TextInput from "../components/TextInput"
import Select from "../components/Select"
import MultiSelect from "../components/MultiSelect"
import YoutubeEmbed from "../components/YoutubeEmbed"
import useNotify from "../hooks/useNotify"
import { createExercise, updateExercise } from "../reducers/exerciseReducer"
import { selectFormExerciseById } from "../selectors/exerciseSelectors"
import { selectUser } from "../selectors/userSelectors"
import Loading from "../components/Loading"
import Spinner from "../components/Spinner"

type ExerciseFormProps = {
  updating?: boolean
  duplicating?: boolean
}

const ExerciseForm = ({ updating, duplicating }: ExerciseFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const user = useAppSelector(selectUser)!
  const selectedExercise = useAppSelector((state) =>
    selectFormExerciseById(state, id || "")
  )
  const { notify } = useNotify()
  const [exercise, setExercise] = useState<types.FormExercise>(EMPTY_EXERCISE)
  const [buttonLoading, setButtonLoading] = useState(false)

  const unauthorized =
    updating && selectedExercise && user && selectedExercise.user !== user.id

  useEffect(() => {
    resetState()
    if (selectedExercise) {
      if (unauthorized) {
        notify(
          "Cannot edit an exercise that is not yours!",
          types.NotificationType.alert
        )
        navigate(`/app/exercises`)
      }
      if (updating) {
        setExercise(selectedExercise)
      }

      if (duplicating) {
        setExercise(selectedExercise)
      }
    }
    dispatch(setHeaderTitle(updating ? "Edit Exercise" : "Create Exercise"))
  }, [location])

  const resetState = () => {
    setExercise(EMPTY_EXERCISE)
  }

  const isValidForSubmit = () => {
    if (!exercise.name) {
      notify("Exercise must have a name!", types.NotificationType.alert)
      return false
    }

    if (!exercise.type.value) {
      notify("Please choose exercise type!", types.NotificationType.alert)
      return false
    }

    if (!exercise.equipment.value) {
      notify("Please choose equipment!", types.NotificationType.alert)
      return false
    }

    if (!exercise.muscleGroups.length) {
      notify(
        "Please select atleast one muscle group!",
        types.NotificationType.alert
      )
      return false
    }

    return true
  }

  const submitExercise = () => {
    if (!isValidForSubmit()) return

    const parseString = (value: string): number => {
      const parsed = parseFloat(value)
      return isNaN(parsed) ? 100 : parsed
    }

    const { name, videoId, equipment, muscleGroups, type, bodyweightFactor } =
      exercise

    const exerciseToCreate: Omit<types.Exercise, "id" | "user"> = {
      name: name,
      videoId,
      muscleGroups: muscleGroups.map((obj) => obj.value),
      equipment: equipment.value as types.Equipment,
      type: type.value as types.ExerciseType,
      bodyweightFactor: parseString(bodyweightFactor),
    }

    if (updating && selectedExercise && id && user) {
      setButtonLoading(true)
      dispatch(updateExercise({ id, user: user.id, ...exerciseToCreate }))
        .then(({ id }) => navigate(`/app/exercises/${id}`))
        .catch(() => {
          notify("Something went wrong", types.NotificationType.alert)
        })
        .finally(() => setButtonLoading(false))
    } else {
      setButtonLoading(true)
      dispatch(createExercise(exerciseToCreate))
        .then(({ id }) => navigate(`/app/exercises/${id}`))
        .catch(() => {
          notify("Something went wrong", types.NotificationType.alert)
        })
        .finally(() => setButtonLoading(false))
    }
  }

  if (unauthorized) {
    return null
  }

  return (
    <Page>
      <Page.Header>
        <div className="py-4 container px-6 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <GoBackButton to="/app/exercises">Exercises</GoBackButton>
            </div>

            <div>
              <Button variant="success" onClick={submitExercise}>
                <div className="flex gap-2 items-center">
                  {buttonLoading && <Spinner />}
                  <h3>{updating ? "Update Exercise" : "Save Exercise"}</h3>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Page.Header>
      <Page.Content>
        <div className="max-w-screen-md mx-auto">
          <div className="space-y-4">
            <TextInput
              label="Exercise Name"
              placeholder="Name"
              value={exercise.name}
              onChange={({ target }) =>
                setExercise({ ...exercise, name: target.value })
              }
            />

            {!updating && (
              <Select
                label="Select Exercise Type"
                value={exercise.type}
                options={EXERCISE_TYPE_OPTIONS}
                onChange={(value) => setExercise({ ...exercise, type: value })}
              />
            )}

            {!!exercise.type.value &&
              exercise.type.value !== types.ExerciseType.repsAndKg && (
                <TextInput
                  label="Bodyweight Factor %"
                  placeholder="Percent (defaults to 100)"
                  value={exercise.bodyweightFactor}
                  onChange={({ target }) =>
                    setExercise({
                      ...exercise,
                      bodyweightFactor:
                        REGEX_INT_0_TO_100.test(target.value) ||
                        target.value === ""
                          ? target.value
                          : exercise.bodyweightFactor,
                    })
                  }
                />
              )}

            <Select
              label="Select Equipment"
              value={exercise.equipment}
              options={EQUIPMENT_OPTIONS}
              onChange={(value) =>
                setExercise({ ...exercise, equipment: value })
              }
            />

            <MultiSelect
              label="Select Muscle Groups"
              values={exercise.muscleGroups}
              options={MUSCLE_GROUP_OPTIONS}
              onChange={(value) =>
                setExercise({ ...exercise, muscleGroups: value })
              }
            />
          </div>

          <div className="border-t mt-8"></div>

          <div className="mt-8 space-y-4">
            <TextInput
              label="Exercise Video (optional)"
              placeholder="YouTube Video Id"
              value={exercise.videoId}
              onChange={({ target }) =>
                setExercise({ ...exercise, videoId: target.value })
              }
            />
            <div>
              <h3 className="font-medium leading-6">Video Preview</h3>

              <YoutubeEmbed
                embedId={exercise.videoId || "liJVSwOiiwg?start=35"}
              />
            </div>
          </div>
        </div>
      </Page.Content>
    </Page>
  )
}

export default ExerciseForm
