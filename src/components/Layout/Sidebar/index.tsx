import { Fragment } from "react"
import { Transition } from "@headlessui/react"

import Content from "./Content"

import { useAppDispatch, useAppSelector } from "../../../hooks"
import { closeSidebar } from "../../../reducers/sidebarReducer"
import { selectSidebarOpen } from "../../../selectors/sidebarSelectors"

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectSidebarOpen)

  return (
    <>
      {/* Desktop */}
      <aside className="relative hidden w-sidebar overflow-y-auto bg-white lg:block">
        <Content />
      </aside>

      {/* Mobile */}
      <Transition.Root show={open}>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed z-50 inset-0 top-16 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => dispatch(closeSidebar())}
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0 transform -translate-x-20"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 transform -translate-x-20"
        >
          <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-sidebar mt-16 overflow-y-auto bg-white lg:hidden">
            <Content />
          </aside>
        </Transition.Child>
      </Transition.Root>
    </>
  )
}

export default Sidebar
