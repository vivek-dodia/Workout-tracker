import DropdownOption from "./DropdownOption"
import { PlusIcon } from "@heroicons/react/24/outline"

type Props = {
  onClick: () => void,
  title?: string
}

const AddOption = ({ onClick, title = "Add" }: Props) => {
  return (
    <DropdownOption
      onClick={onClick}
      Icon={PlusIcon}
      title={title}
    />
  )
}

export default AddOption