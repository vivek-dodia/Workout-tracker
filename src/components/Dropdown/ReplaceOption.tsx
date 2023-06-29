import DropdownOption from "./DropdownOption"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

type Props = {
  onClick: () => void
  title?: string
}

const ReplaceOption = ({ onClick, title = "Replace" }: Props) => {
  return (
    <DropdownOption
      onClick={onClick}
      Icon={ArrowPathIcon}
      title={title}
    />
  )
}

export default ReplaceOption
