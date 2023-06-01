import { useEffect } from "react"
import useStateInitialization from "../../hooks/useStateInitialization"

import withAuthGuard from "../../guards/withAuthGuard"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Routes from "./Routes"
import Loading from "../Loading"

const Layout = () => {
  const { initializeState, loading, loadingText } = useStateInitialization()

  useEffect(() => {
    initializeState()
  }, [])

  if (loading) return <Loading loadingText={loadingText} />

  return (
    <div className={`flex h-screen w-full bg-gray-50 dark:bg-gray-900`}>
      <Sidebar />
      {/* <Confirmation /> */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="overflow-y-auto flex-1 flex flex-col">
          <div className="relative flex-1">
            <Routes />
          </div>
          {/* <Footer /> */}
        </main>
      </div>
    </div>
  )
}

export default withAuthGuard(Layout)
