import { Menu } from "@headlessui/react"
import { HeroIcon } from "../../types"
import { classNames } from "../../utils/fn"

type Props = {
  onClick: () => void
  disabled?: boolean
  title: string
  Icon: HeroIcon
  color?: string
}

const DropdownOption = ({
  onClick,
  title,
  Icon,
  color = "blue-500",
  disabled,
}: Props) => {
  return (
    <Menu.Item>
      {({ active, close }) => (
        <button
          className={classNames(
            "group flex w-full items-center rounded-md px-2 py-2 text-sm",
            active ? `bg-${color} text-white` : "text-gray-900",
            disabled ? "opacity-50" : "opacity-100"
          )}
          onClick={(e) => {
            e.preventDefault()
            onClick()
            close()
          }}
          disabled={disabled}
        >
          {active ? (
            <Icon className="mr-2 h-5 w-5 text-white" aria-hidden="true" />
          ) : (
            <Icon className={`mr-2 h-5 w-5 text-${color}`} aria-hidden="true" />
          )}
          {title}
        </button>
      )}
    </Menu.Item>
  )
}

export default DropdownOption
