import { Link, useLocation } from 'react-router-dom'
import XIconSvg from '../../components/ui/icons/XIconSvg'
import NavMenu from './NavMenu'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { pageRoutes } from '../../routes'
import { UserPreview } from './UserPreview'
import { UserPreviewDropdown } from './UserPreviewDropdown'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'

const NavSidebar = ({
  menuOpen,
  closeMenu,
}: {
  menuOpen: boolean
  closeMenu: () => void
}) => {
  const location = useLocation()
  const user = useAppSelector(selectUserPreview)!

  return (
    <>
      <div
        className={` fixed h-full w-[270px] transform border-r border-accent bg-base-100 sm:w-[75px] lg:w-[270px] ${menuOpen ? 'animate-slide-in-left sm:animate-none' : 'animate-slide-out-left'}`}
      >
        <div className=" flex h-full flex-col pb-6 pt-3 ">
          <div className=" flex flex-1 flex-col">
            <div className=" mb-3 px-4">
              <Link
                to={'/'}
                className=" btn btn-ghost p-3 text-secondary"
                onClick={closeMenu}
              >
                <XIconSvg width={22} height={22} fill="currentColor" />
              </Link>
            </div>
            <NavMenu closeMenu={closeMenu} />
          </div>
          <div className=" flex flex-col justify-center px-4">
            <div className=" mb-5 flex justify-center">
              <Link
                to={pageRoutes.post}
                state={{ backgroundLocation: location }}
                onClick={() => {
                  closeMenu()
                }}
                className=" btn btn-primary h-fit min-h-0 rounded-2xl px-14 py-4  !text-lg sm:px-3  sm:py-2 lg:h-fit lg:min-h-0 lg:rounded-2xl lg:px-16 lg:py-2"
              >
                <p className=" sm:hidden lg:block">Post</p>
                <FaRegPenToSquare
                  height={13}
                  width={13}
                  className="hidden sm:block lg:hidden"
                />
              </Link>
            </div>
            <div className=" flex justify-between sm:flex-col lg:flex-row">
              <UserPreview onUserLinkClick={closeMenu} user={user} />
              <UserPreviewDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default NavSidebar
