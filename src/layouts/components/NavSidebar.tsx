import { Link, useLocation } from 'react-router-dom'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { pageRoutes } from '../../routes'
import { UserPreview } from './UserPreview'
import { UserPreviewDropdown } from './UserPreviewDropdown'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { NavMenu } from './NavMenu'
import { LinkerIcon } from '@/src/components/ui/LinkerIcon'

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
        className={` fixed h-full w-[270px] transform border-r border-accent bg-base-100 sm:w-[75px] xl:w-[270px] ${menuOpen ? 'animate-slide-in-left sm:animate-none' : 'animate-slide-out-left'}`}
      >
        <div className=" flex h-full flex-col pb-6 pt-3 ">
          <div className=" flex flex-1 flex-col">
            <div className=" mb-3 px-4">
              <Link
                to={'/'}
                aria-label="Linker"
                className=" btn btn-ghost p-3 text-secondary"
                onClick={closeMenu}
              >
                <LinkerIcon width={25}/>
              </Link>
            </div>
            <NavMenu closeMenu={closeMenu} />
          </div>
          <div className=" flex flex-col justify-center px-4">
            <div className=" mb-5 flex justify-center">
              <Link
                to={pageRoutes.createPost}
                state={{ backgroundLocation: location }}
                onClick={() => {
                  closeMenu()
                }}
                className=" btn btn-primary h-fit min-h-0 rounded-2xl px-14 py-4  !text-lg sm:px-3  sm:py-2 xl:h-fit xl:min-h-0 xl:rounded-2xl xl:px-16 xl:py-2"
              >
                <p className=" sm:hidden xl:block">Post</p>
                <FaRegPenToSquare
                  height={13}
                  width={13}
                  className="hidden sm:block xl:hidden"
                  aria-label="Post"
                />
              </Link>
            </div>
            <div className=" flex items-center justify-between sm:flex-col xl:flex-row">
              <UserPreview
                onUserLinkClick={closeMenu}
                user={user}
                isResponsive
              />
              <UserPreviewDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default NavSidebar
