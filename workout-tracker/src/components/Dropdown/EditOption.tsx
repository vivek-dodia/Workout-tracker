import DropdownOption from "./DropdownOption"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

type Props = {
  onClick: () => void
  title?: string

}

const EditOption = ({ onClick, title = "Edit" }: Props) => {
  return (
    <DropdownOption
      onClick={onClick}
      Icon={PencilSquareIcon}
      title={title}
    />
  )
}

export default EditOption
