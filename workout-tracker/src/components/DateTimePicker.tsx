import React from "react"
import { classNames } from "../utils/fn"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameLabel?: string
  label?: string
}

const DateTimePicker = ({
  label,
  className,
  classNameLabel,
  ...props
}: Props) => {
  return (
    <div className={className}>
      <label
        className={classNames("font-medium leading-6", classNameLabel || "")}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="datetime-local"
          className={classNames(
            "w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:leading-6",
            props.disabled ? "opacity-60" : "opacity-100"
          )}
          {...props}
        />
      </div>
    </div>
  )
}

export default DateTimePicker
