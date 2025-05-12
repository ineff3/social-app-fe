import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import UsernameModule from './username-module/UsernameModule'
import { ProfilePhotoModule } from './profile-photo-module/ProfilePhotoModule'
import usePagination from '@/src/hooks/usePagination'
import { useModal } from '@/src/hooks/useModal'
import { pageRoutes } from '@/src/routes'
import Modal from '@/src/components/ui/Modal'
import { Helmet } from 'react-helmet-async'
import { LinkerIcon } from '@/src/components/ui/LinkerIcon'

export const SignupFlowPage = () => {
  const { page, nextPage } = usePagination()

  const location = useLocation()
  const { close, visible } = useModal(true)
  const navigate = useNavigate()
  const from = location.state?.from?.pathname

  const [searchParams] = useSearchParams()
  const newUser = searchParams.get('newUser')

  const modalClose = () => {
    close()
    navigate(pageRoutes.home)
  }

  return (
    <>
      <Helmet>
        <title>Complete Your Signup | Linker</title>
        <meta
          name="description"
          content="Finish setting up your Linker account and personalize your experience."
        />
        <meta property="og:title" content="Complete Your Signup | Linker" />
        <meta
          property="og:description"
          content="Finish setting up your Linker account and start connecting."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {from === pageRoutes.authSignup || (newUser && newUser === 'true') ? (
        <Modal
          isOpen={visible}
          onClose={modalClose}
          staticMode
          maxWidth="max-w-md"
        >
          <div className=" flex min-h-[430px] flex-col ">
            <div className=" mb-7 self-center ">
              <LinkerIcon width={25} />
            </div>
            {page === 1 && <UsernameModule next={nextPage} />}
            {page === 2 && <ProfilePhotoModule />}
          </div>
        </Modal>
      ) : (
        <Navigate to={pageRoutes.home} />
      )}
    </>
  )
}
