import React from "react"
import { classNames } from "../utils/fn"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameLabel?: string
  label?: string
  simple?: boolean
}

const TextInput = ({
  label,
  className,
  classNameLabel,
  simple,
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
          className={classNames(
            "w-full p-2 text-gray-900 placeholder:text-gray-400 sm:leading-6",
            props.disabled ? "opacity-60" : "opacity-100",
            simple
              ? "outline-none"
              : "rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500"
          )}
          {...props}
        />
      </div>
    </div>
  )
}

export default TextInput
