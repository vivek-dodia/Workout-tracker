import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/solid"
import { ChevronUpDownIcon } from "@heroicons/react/24/outline"
import { EquipmentOption, ExerciseTypeOption } from "../types"

type SelectProps<T> = {
  value: T
  label?: string
  options: T[]
  onChange: (value: T) => void
}

const Select = <T extends EquipmentOption | ExerciseTypeOption>({
  value,
  label,
  options,
  onChange,
}: SelectProps<T>) => {
  return (
    <div>
      <Listbox value={value} onChange={onChange}>
        <Listbox.Label className="block font-medium leading-6">
          {label}
        </Listbox.Label>
        <div className="relative inline">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white p-2 pr-10 text-left mt-2">
            <span className="block truncate">{value.label || "Select..."}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-500 text-white" : "text-black"
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-blue-500"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Select
