import DropdownOption from "./DropdownOption"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

type Props = {
  onClick: () => void
  title?: string
}

const DuplicateOption = ({ onClick, title = "Duplicate" }: Props) => {
  return (
    <DropdownOption
      onClick={onClick}
      Icon={DocumentDuplicateIcon}
      title={title}
    />
  )
}

export default DuplicateOption
