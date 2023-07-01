import GoBackButton from "../GoBackButton"
import { classNames } from "../../utils/fn"

type PageProps = {
  children?: React.ReactNode
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="h-full w-full flex flex-col relative pb-20">{children}</div>
  )
}

type HeaderProps = {
  children?: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div className={classNames("bg-gray-50 z-20 sticky top-0")}>{children}</div>
  )
}

type GoBackProps = {
  children?: React.ReactNode
  to: string
}

const GoBack = ({ children, to }: GoBackProps) => {
  return (
    <div className="py-6 z-10 sticky top-0">
      <GoBackButton to={to}>{children}</GoBackButton>
    </div>
  )
}

const Title = ({ children }: PageProps) => {
  return (
    <h1 className="py-8 text-5xl font-bold text-gray-700">
      {children}
    </h1>
  )
}

const Subtitle = ({ children }: PageProps) => {
  return (
    <h3 className="pb-6 text-xl font-semibold text-gray-400">
      {children}
    </h3>
  )
}

const Content = ({ children }: PageProps) => {
  return <div className="flex-1 container px-6 mx-auto">{children}</div>
}

Page.Header = Header
Page.GoBack = GoBack
Page.Title = Title
Page.Subtitle = Subtitle
Page.Content = Content

export default Page
