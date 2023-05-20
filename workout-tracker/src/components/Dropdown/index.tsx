import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { classNames } from "../../utils/fn"

type Props = {
  children?: React.ReactNode
  className?: string
}

const Dropdown = ({ children, className = "" }: Props) => {
  return (
    <div
      className={classNames("", className)}
      onClick={(e) => e.preventDefault()}
    >
      <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button className="flex items-center z-10">
            <EllipsisVerticalIcon className="h-6 w-6 " />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-0"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown
