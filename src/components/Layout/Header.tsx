import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import Avatar from "../Avatar"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { classNames } from "../../utils/fn"
import { signOut } from "../../reducers/userReducer"
import { selectSidebarOpen } from "../../selectors/sidebarSelectors"
import { selectHeaderTitle } from "../../selectors/headerTitleSelectors"
import { selectUser } from "../../selectors/userSelectors"
import { clearHeaderTitle } from "../../reducers/headerTitleReducer"
import { toggleSidebar } from "../../reducers/sidebarReducer"

const userNavigation = [
  { name: "Settings", href: "/app/account" },
]

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const sidebarOpen = useAppSelector(selectSidebarOpen)
  const location = useLocation()
  const headerTitle = useAppSelector(selectHeaderTitle)
  const user = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(clearHeaderTitle())
  }, [location])

  return (
    <header className="bg-white py-4 border-b h-header">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Menu"
        >
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
        <h3 className="font-bold text-2xl">{headerTitle}</h3>

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex items-center rounded-full hover:ring-2 hover:ring-gray-500">
              <Avatar initials={user?.username[0].toUpperCase() || "AA"} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <div className="p-4 border-b">
                  <h2 className="font">{user?.username}</h2>
                  <h3 className="text-sm text-gray-500">{user?.email}</h3>
                </div>
              </Menu.Item>

              <div className="py-1">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        to={item.href}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <Menu.Item>
                {({ active }) => (
                  <div className="border-t py-1">
                    <button
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        dispatch(signOut())
                        navigate("/signin")
                      }}
                    >
                      <h3>Sign Out</h3>
                    </button>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  )
}

export default Header
