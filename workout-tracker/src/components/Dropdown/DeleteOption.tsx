import DropdownOption from "./DropdownOption"
import { TrashIcon } from "@heroicons/react/24/outline"

type Props = {
  onClick: () => void,
  title?: string
}

const DeleteOption = ({ onClick, title = "Delete" }: Props) => {
  return (
    <DropdownOption
      onClick={onClick}
      Icon={TrashIcon}
      color="red-500"
      title={title}
    />
  )
}

export default DeleteOption
