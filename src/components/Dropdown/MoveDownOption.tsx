import DropdownOption from "./DropdownOption"
import { ArrowDownIcon } from "@heroicons/react/24/outline"

type Props = {
  onClick: () => void
  disabled?: boolean,
  title?: string
}

const MoveDownOption = ({ onClick, disabled, title = "Move Down" }: Props) => {
  return (
    <DropdownOption
      onClick={onClick}
      Icon={ArrowDownIcon}
      title={title}
      disabled={disabled}
    />
  )
}

export default MoveDownOption
