import { classNames } from "../utils/fn"

type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "alert"
  | "neutral"

type Props = {
  variant?: Variant
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

const colorMap = {
  primary: "bg-indigo-600 hover:bg-indigo-500",
  secondary: "bg-blue-600 hover:bg-blue-500",
  tertiary: "bg-purple-600 hover:bg-purple-500",
  success: "bg-green-600 hover:bg-green-500",
  alert: "bg-red-600 hover:bg-red-500",
  neutral: "bg-gray-600 hover:bg-gray-500",
}

const Button = ({
  variant = "primary",
  onClick,
  children,
  className = "",
}: Props) => {

  return (
    <button
      type="button"
      className={classNames(
        "rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm",
        colorMap[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
