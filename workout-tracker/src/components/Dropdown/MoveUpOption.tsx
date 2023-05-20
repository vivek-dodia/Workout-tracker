import DropdownOption from "./DropdownOption"
import { ArrowUpIcon } from "@heroicons/react/24/outline"

type Props = {
  onClick: () => void
  disabled?: boolean
  title?: string
}

const MoveUpOption = ({ onClick, disabled, title = "Move Up" }: Props) => {
  return (
    <DropdownOption
      onClick={onClick}
      Icon={ArrowUpIcon}
      title={title}
      disabled={disabled}
    />
  )
}

export default MoveUpOption
