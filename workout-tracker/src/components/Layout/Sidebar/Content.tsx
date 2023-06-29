import { Link, NavLink } from "react-router-dom"
import { GiWeightLiftingUp } from "react-icons/gi"
import { MdHome, MdHistory, MdPerson2 } from "react-icons/md"
import { HiChartBar, HiOutlineCalculator } from "react-icons/hi"
import { IconType } from "react-icons"

import { classNames } from "../../../utils/fn"
import LinkButton from "../../LinkButton"
import { PlusIcon } from "@heroicons/react/24/outline"

export interface NavItem {
  title: string
  Icon: IconType
  href: string
}

const mainPaths: NavItem[] = [
  {
    title: "Dashboard",
    Icon: MdHome,
    href: "dashboard",
  },
  {
    title: "Analytics",
    Icon: HiChartBar,
    href: "analytics",
  },
  {
    title: "Exercises",
    Icon: GiWeightLiftingUp,
    href: "exercises",
  },

  {
    title: "Workouts",
    Icon: MdHistory,
    href: "workouts",
  },
  {
    title: "Calculators",
    Icon: HiOutlineCalculator,
    href: "calculators",
  },
  {
    title: "Account",
    Icon: MdPerson2,
    href: "account",
  },
]

const Content = () => {
  return (
    <div className="">
      <header className="h-header flex items-center text-lg font-semibold mx-4">
        <Link to="/app/dashboard" className="flex gap-4 items-center px-4">
          <img src="/logo.png" className="h-6 w-6" />
          <h1>FitTrackerX</h1>
        </Link>
      </header>

      <div className="mt-4 flex items-center justify-center mx-4">
        <LinkButton
          className="flex items-center justify-center w-full"
          variant="success"
          to="/app/workouts/new"
        >
          <div className="flex gap-2 items-center">
            <PlusIcon className="h6 w-6" />
            <h3>Add workout</h3>
          </div>
        </LinkButton>
      </div>

      <nav className="mt-4">
        {mainPaths.map(({ title, Icon, href }, i) => (
          <NavLink
            key={i}
            to={href}
            className={({ isActive }) =>
              classNames(
                isActive ? "bg-slate-100" : "bg-white",
                "px-4 mx-4 py-2 flex gap-4 items-center rounded-lg"
              )
            }
          >
            {({ isActive }) => (
              <div className="flex gap-4 items-center">
                <Icon
                  className={classNames(
                    isActive ? "text-blue-500" : "text-gray-500",
                    "h-6 w-6"
                  )}
                />
                <p
                  className={classNames(
                    isActive ? "text-black" : "text-gray-500"
                  )}
                >
                  {title}
                </p>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Content
