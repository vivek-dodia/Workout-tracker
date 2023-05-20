import { NavLink } from "react-router-dom"
import { GiWeightLiftingUp } from "react-icons/gi"
import { MdHome, MdHistory, MdPerson2 } from "react-icons/md"
import { HiTemplate, HiCog, HiChartBar } from "react-icons/hi"
import { IconType } from "react-icons"

import { classNames } from "../../../utils/fn"

export interface NavItem {
  title: string
  Icon: IconType
  href: string
}

const devPaths: NavItem[] = [
  {
    title: "ADMIN TOOLS",
    Icon: HiCog,
    href: "admin",
  },
  {
    title: "PLAYGROUND",
    Icon: HiCog,
    href: "playground",
  },
  {
    title: "Sign In",
    Icon: HiCog,
    href: "/signin",
  },
  {
    title: "Sign Up",
    Icon: HiCog,
    href: "/signup",
  },
]

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
    title: "Account",
    Icon: MdPerson2,
    href: "account",
  },
]

const paths: NavItem[] = [
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
    title: "Settings",
    Icon: HiCog,
    href: "settings",
  },
  {
    title: "Measures",
    Icon: HiTemplate,
    href: "measures",
  },
  {
    title: "Calendar",
    Icon: HiTemplate,
    href: "calendar",
  },
  {
    title: "Calculators",
    Icon: HiTemplate,
    href: "calculators",
  },
  {
    title: "Planned features",
    Icon: HiTemplate,
    href: "features",
  },
]

const Content = () => {
  return (
    <div className="">
      <header className="h-header flex items-center text-lg font-semibold px-4 ">
        <div>FitTrackerX</div>
      </header>

      <nav className="pt-8">
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

      <div className="border-b my-4"></div>

      <nav>
        {paths.map(({ title, Icon, href }, i) => (
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

      <nav className="pt-8">
        {devPaths.map(({ title, Icon, href }, i) => (
          <NavLink
            key={i}
            to={href}
            className={({ isActive }) =>
              classNames(
                isActive ? "bg-slate-100" : "bg-white",
                "px-4 py-2 flex gap-4 items-center rounded-lg"
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
