import { useNavigate } from "react-router-dom"

const Test = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col">
      <button onClick={() => navigate("/app/dashboard")}>Nav Dashboard</button>
      <button onClick={() => navigate("/app")}>Nav App</button>
    </div>
  )
}

export default Test
