import { useNavigate } from "react-router-dom"
import Page from "../components/Layout/Page"
import { DurationAndWorkoutsGraph } from "./Analytics"
import { useAppDispatch } from "../hooks"
import { useEffect } from "react"
import { setHeaderTitle } from "../reducers/headerTitleReducer"

type Props = {
  hello?: string
}

const Dashboard = ({ hello }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setHeaderTitle("Dashboard"))
  }, [])
  return (
    <Page>
      <Page.Header></Page.Header>
      <Page.Content>
        <div className="mt-8 grid grid-cols-2">
          <DurationAndWorkoutsGraph onDashboard/>
        </div>
      </Page.Content>
    </Page>
  )
}

export default Dashboard
