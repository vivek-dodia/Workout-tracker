import { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"

import SignIn from "./pages/SignIn"
import Alert from "./components/Alert"
import Layout from "./components/Layout"
import NoMatch from "./pages/NoMatch/NoMatch"
import { useAppDispatch } from "./hooks"
import { initUser } from "./reducers/userReducer"
import Loading from "./components/Loading"

const PathActions = (): null => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.querySelector("main")?.scrollTo(0, 0)

    if (location.pathname === "/app") {
      navigate("/app/dashboard")
    }
  }, [pathname])

  return null
}

const App = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      dispatch(initUser())
      setLoading(false)
    }, 0)
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <Alert />
      <Router>
        <PathActions />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/app/*" element={<Layout />} />
          <Route path="/*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
