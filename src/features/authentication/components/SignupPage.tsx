import { useModal } from '../../../hooks/useModal'
import Modal from '../../../components/ui/Modal'
import { useNavigate } from 'react-router-dom'
import SignupForm from './SignupForm'
import { useState } from 'react'
import { pageRoutes } from '../../../routes'
import ErrorAlert from '../../../components/ui/ErrorAlert'
import { CloseCircleButton } from '@/src/components/ui/buttons/CloseCircleButton'

export const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()
  const { close, visible } = useModal(true)
  const closeWithPageShift = () => {
    navigate(pageRoutes.auth)
    close()
  }

  return (
    <Modal onClose={closeWithPageShift} isOpen={visible}>
      <div
        className={` flex flex-col items-center ${errorMessage ? 'gap-5' : 'gap-10'} `}
      >
        <div className=" flex w-full justify-between">
          <p className=" text-2xl font-bold text-secondary">
            Create a new account
          </p>
          <CloseCircleButton onClick={closeWithPageShift} />
        </div>
        <div className=" flex w-full flex-col gap-5">
          {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
          <SignupForm setErrorMessage={setErrorMessage} />
        </div>
      </div>
    </Modal>
  )
}
