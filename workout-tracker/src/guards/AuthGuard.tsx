import { useEffect } from "react"
import { useAppSelector } from "../hooks"
import { selectUser } from "../selectors/userSelectors"
import { useNavigate } from "react-router-dom"

type Props = {
  children?: React.ReactNode
}

const AuthGuard = ({ children }: Props) => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (!user) navigate("/signin")
  }, [user])

  return <>{children}</>
}

export default AuthGuard
