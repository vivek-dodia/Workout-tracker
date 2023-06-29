import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Button from "./Button"

type Props = {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

const Confirmation = ({ show, onClose, onConfirm, title, message }: Props) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <>
                  <div>
                    <h1 className="text-lg font-bold">{title}</h1>
                    <h3 className="mt-2">{message}</h3>
                  </div>
                  <div className="flex gap-4 justify-center mt-10">
                    <Button
                      className="flex-1"
                      variant="neutral"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      className="flex-1"
                      variant="success"
                      onClick={() => {
                        onConfirm()
                        onClose()
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Confirmation
