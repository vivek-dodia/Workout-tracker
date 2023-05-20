import { useNavigate } from "react-router-dom"

type Props = {
  hello?: string
}

const Dashboard = ({ hello }: Props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col">
      <button onClick={() => navigate("/app/test")}>Nav Test</button>
      <button onClick={() => navigate("/app")}>Nav App</button>
    </div>
  )
}

export default Dashboard
