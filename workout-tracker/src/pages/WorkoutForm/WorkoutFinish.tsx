import React from "react"
import Page from "../../components/Layout/Page"
import Button from "../../components/Button"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import TextInput from "../../components/TextInput"
import { FormWorkout } from "../../types"
import WorkoutStats from "./WorkoutStats"
import TextArea from "../../components/TextArea"
import DateTimePicker from "../../components/DateTimePicker"
import { format, parseISO } from "date-fns"
import { REGEX_INT } from "../../utils/const"

type WorkoutFinishInputsProps = {
  workout: FormWorkout
  setWorkout: React.Dispatch<FormWorkout>
}

export const WorkoutFinishInputs = ({
  workout,
  setWorkout,
}: WorkoutFinishInputsProps) => {
  return (
    <div className="space-y-4">
      <TextInput
        label="Workout Name"
        placeholder="Name"
        value={workout.name}
        onChange={({ target }) =>
          setWorkout({ ...workout, name: target.value })
        }
      />
      <TextInput
        label="Workout Duration (minutes)"
        placeholder="Minutes"
        value={workout.duration}
        onChange={({ target }) =>
          setWorkout({
            ...workout,
            duration:
              REGEX_INT.test(target.value) || target.value === ""
                ? target.value
                : workout.duration,
          })
        }
      />
      <DateTimePicker
        label="Date (dd/mm/yyyy hh/mm)"
        value={
          format(parseISO(workout.date), "yyyy-MM-dd") +
          "T" +
          format(parseISO(workout.date), "H:mm")
        }
        onChange={({ target }) => {
          setWorkout({
            ...workout,
            date: new Date(target.value || Date.now()).toISOString(),
          })
        }}
      />
      <TextArea
        label="Workout Notes"
        placeholder="Notes (Optional)"
        value={workout.notes}
        onChange={({ target }) =>
          setWorkout({ ...workout, notes: target.value })
        }
      />
    </div>
  )
}

type Props = {
  workout: FormWorkout
  setFinishingWorkout: React.Dispatch<boolean>
  setWorkout: React.Dispatch<FormWorkout>
  submitWorkout: () => void
}

const WorkoutFinish = ({
  workout,
  setFinishingWorkout,
  setWorkout,
  submitWorkout,
}: Props) => {
  return (
    <Page>
      <Page.Header>
        <div className="py-4 container px-6 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <button
                className="flex gap-2 items-center"
                onClick={() => setFinishingWorkout(false)}
              >
                <ArrowLeftIcon className="h-5 w-5" />
                <h4 className="font-semibold text-gray-600">Workout</h4>
              </button>
            </div>

            <div>
              <WorkoutStats workout={workout} />
            </div>

            <div>
              <Button variant="success" onClick={submitWorkout}>
                Save Workout
              </Button>
            </div>
          </div>
        </div>
      </Page.Header>
      <Page.Content>
        <div className="mt-8">
          <WorkoutFinishInputs workout={workout} setWorkout={setWorkout} />
        </div>
      </Page.Content>
    </Page>
  )
}

export default WorkoutFinish
