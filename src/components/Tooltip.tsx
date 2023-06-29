import React from "react"
import { classNames } from "../utils/fn"

type Props = {
  children: React.ReactNode
  text?: string
  position?: string
  className?: string
}

const Tooltip = ({
  children,
  text,
  position = "top",
  className = "",
}: Props) => {
  return (
    <div className={classNames("group relative inline-block", className)}>
      {children}
      {position === "top" && (
        <div className="absolute duration-200 transition-all bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 pointer-events-none">
          <span className="absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black"></span>
          {text}
        </div>
      )}
      {position === "right" && (
        <div className="absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 pointer-events-none">
          <span className="absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black"></span>
          {text}
        </div>
      )}
      {position === "bottom" && (
        <div className="absolute top-full left-1/2 z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 pointer-events-none">
          <span className="absolute top-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black"></span>
          {text}
        </div>
      )}
      {position === "left" && (
        <div className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 pointer-events-none">
          <span className="absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black"></span>
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
