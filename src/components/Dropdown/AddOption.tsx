import DropdownOption from "./DropdownOption"
import { PlusIcon } from "@heroicons/react/24/outline"

type Props = {
  onClick: () => void
  title?: string
  color?: string
}

const AddOption = ({ onClick, title = "Add", color = "blue-500" }: Props) => {
  return (
    <DropdownOption
      onClick={onClick}
      Icon={PlusIcon}
      title={title}
      color={color}
    />
  )
}

export default AddOption
