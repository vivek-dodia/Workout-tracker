import { useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

type Props = {
  children?: React.ReactNode
  to?: string
}

const GoBackButton = ({ children, to }: Props) => {
  const navigate = useNavigate()

  return (
    <button
      className="flex gap-2 items-center"
      onClick={() => (!!to ? navigate(to) : navigate(-1))}
    >
      <ArrowLeftIcon className="h-5 w-5" />
      <h4 className="font-semibold text-gray-600">{children}</h4>
    </button>
  )
}

export default GoBackButton
