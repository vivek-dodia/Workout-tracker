import { useState, useEffect, useMemo } from "react"
import Page from "../components/Layout/Page"
import { CALCULATOR_OPTIONS, REGEX_DECIMAL } from "../utils/const"
import Select from "../components/Select"
import { useLocation } from "react-router-dom"
import { useAppDispatch } from "../hooks"
import { setHeaderTitle } from "../reducers/headerTitleReducer"
import { oneRepMax } from "../utils/fn"
import TextInput from "../components/TextInput"

const repetitionPercentages = [
  1, 0.97, 0.94, 0.92, 0.89, 0.86, 0.83, 0.81, 0.78, 0.75, 0.73, 0.71, 0.7,
  0.68, 0.67, 0.65, 0.64, 0.62, 0.61, 0.6, 0.59, 0.58, 0.57, 0.56, 0.55, 0.54,
  0.53, 0.52, 0.51, 0.5,
]

const parseStringToNumber = (str: string): number => {
  const parsed = parseFloat(str)
  return isFinite(parsed) ? parsed : 0
}

const WarmupCalc = () => {
  const [weight, setWeight] = useState("")

  return (
    <div>
      <div className="space-y-4">
        <TextInput
          placeholder="Kg"
          label="Weight (kg)"
          className="flex-1"
          value={weight}
          onChange={({ target }) =>
            setWeight(
              REGEX_DECIMAL.test(target.value) || target.value === ""
                ? target.value
                : weight
            )
          }
        />
      </div>
      <div className="mt-8">
        <div className="mt-4 grid grid-cols-3 items-center py-2 border-b-2 font-medium text-sm">
          <h3 className="text-left">Set</h3>
          <h3 className="text-center">Reps</h3>
          <h3 className="text-right">Weight</h3>
        </div>
        <div className="divide-y">
          <div className="grid grid-cols-3 items-center py-2 text-sm">
            <h3 className="text-left">1</h3>
            <h3 className="text-center">15</h3>
            <h3 className="text-right">Bar (20kg)</h3>
          </div>

          <div className="grid grid-cols-3 items-center py-2 text-sm">
            <h3 className="text-left">2</h3>
            <h3 className="text-center">5</h3>
            <h3 className="text-right">
              {(parseStringToNumber(weight) * 0.4).toFixed(2)} kg
            </h3>
          </div>

          <div className="grid grid-cols-3 items-center py-2 text-sm">
            <h3 className="text-left">3</h3>
            <h3 className="text-center">4</h3>
            <h3 className="text-right">
              {(parseStringToNumber(weight) * 0.5).toFixed(2)} kg
            </h3>
          </div>

          <div className="grid grid-cols-3 items-center py-2 text-sm">
            <h3 className="text-left">4</h3>
            <h3 className="text-center">3</h3>
            <h3 className="text-right">
              {(parseStringToNumber(weight) * 0.6).toFixed(2)} kg
            </h3>
          </div>

          <div className="grid grid-cols-3 items-center py-2 text-sm">
            <h3 className="text-left">5</h3>
            <h3 className="text-center">2</h3>
            <h3 className="text-right">
              {(parseStringToNumber(weight) * 0.75).toFixed(2)} kg
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

const OneRepMaxCalc = () => {
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")

  const orm = useMemo(
    () => oneRepMax(parseStringToNumber(reps), parseStringToNumber(weight)),
    [reps, weight]
  )

  return (
    <div>
      <div className="space-y-4">
        <TextInput
          placeholder="Kg"
          label="Weight (kg)"
          className="flex-1"
          value={weight}
          onChange={({ target }) =>
            setWeight(
              REGEX_DECIMAL.test(target.value) || target.value === ""
                ? target.value
                : weight
            )
          }
        />
        <TextInput
          placeholder="Reps"
          label="Reps"
          className="flex-1"
          value={reps}
          onChange={({ target }) =>
            setReps(
              REGEX_DECIMAL.test(target.value) || target.value === ""
                ? target.value
                : reps
            )
          }
        />
      </div>
      <div className="mt-8">
        <div>
          <h3 className="font-bold text-lg">Your one rep max is {orm} kg</h3>
        </div>
        <div className="mt-4 grid grid-cols-3 items-center py-2 border-b-2 font-medium text-sm">
          <h3 className="text-left">Repetitions</h3>
          <h3 className="text-center">Weight</h3>
          <h3 className="text-right">% of 1RM</h3>
        </div>
        <div className="divide-y">
          {repetitionPercentages.map((percentage, index) => {
            const repetitions = index + 1
            const ormp = (orm * percentage).toFixed(2)
            return (
              <div className="grid grid-cols-3 items-center py-2 text-sm">
                <h3 className="text-left">{repetitions}</h3>
                <h3 className="text-center">{ormp} kg</h3>
                <h3 className="text-right">{(percentage * 100).toFixed()} %</h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const Calculators = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [selectedCalculator, setSelectedCalculator] = useState(
    CALCULATOR_OPTIONS[0]
  )

  useEffect(() => {
    dispatch(setHeaderTitle("Calculators"))
  }, [location])
  return (
    <Page>
      <Page.Header>
        <div className="container px-6 mx-auto">
          <div className="mt-8 max-w-screen-md mx-auto grid grid-cols-1 ">
            <Select
              label="Select Calculator"
              value={selectedCalculator}
              options={CALCULATOR_OPTIONS}
              onChange={(value) => setSelectedCalculator(value)}
            />
          </div>
        </div>
      </Page.Header>
      <Page.Content>
        <div className="mt-8 max-w-screen-md mx-auto grid grid-cols-1">
          {selectedCalculator.value === 0 && <OneRepMaxCalc />}
          {selectedCalculator.value === 1 && <WarmupCalc />}
        </div>
      </Page.Content>
    </Page>
  )
}

export default Calculators
