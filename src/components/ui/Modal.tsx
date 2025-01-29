import { forwardRef, Fragment } from 'react'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { ComponentWithChildrenProps } from '@/src/common/props'

interface Props extends ComponentWithChildrenProps {
  isOpen: boolean
  onClose: () => void
  staticMode?: boolean
  asWindow?: boolean
  maxWidth?: 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-sm'
  hasPadding?: boolean
}

const Modal = forwardRef(
  (
    {
      isOpen,
      onClose,
      children,
      staticMode = false,
      asWindow = true,
      maxWidth = 'max-w-xl',
      hasPadding = true,
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            return staticMode ? {} : onClose()
          }}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className={`flex min-h-full items-center justify-center text-center `}
            >
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  className={` max-h-[700px] transform  overflow-y-auto rounded-2xl bg-base-300 text-left align-middle shadow-xl transition-all ${asWindow ? `w-full ${maxWidth} ${hasPadding && 'p-8'}` : 'w-fit'}`}
                  ref={ref}
                >
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  },
)

export default Modal
