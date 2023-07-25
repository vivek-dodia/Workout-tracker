import { Dispatch } from "react"
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { classNames } from "../utils/fn"

type Props = {
  placeholder: string
  searchQuery: string
  setSearchQuery: Dispatch<string>
  className: string
}
const SearchBar = ({
  placeholder = "Search...",
  searchQuery,
  setSearchQuery,
  className,
}: Props) => {
  return (
    <div className={classNames("w-full rounded-lg", className)}>
      <div className="relative flex gap-4 items-center w-full h-12 px-4 rounded-lg border bg-white overflow-hidden">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
        <input
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          className="outline-none h-full flex-1"
          placeholder={placeholder}
        />
        {!!searchQuery && (
          <XMarkIcon
            data-testid="x-mark-icon"
            className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-400"
            onClick={() => setSearchQuery("")}
          />
        )}
      </div>
    </div>
  )
}

export default SearchBar
