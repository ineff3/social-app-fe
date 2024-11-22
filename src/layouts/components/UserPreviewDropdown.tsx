import MenuDropdown from '@/src/components/ui/MenuDropdown'
import { useLogout } from '@/src/features/authentication'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { pageRoutes } from '@/src/routes'
import { MenuItem, MenuItems } from '@headlessui/react'
import { IoSettingsOutline } from 'react-icons/io5'
import { PiSignOut } from 'react-icons/pi'
import { SlOptions } from 'react-icons/sl'
import { Link, useNavigate } from 'react-router-dom'

export const UserPreviewDropdown = () => {
  const logout = useLogout()
  const navigate = useNavigate()
  const user = useAppSelector(selectUserPreview)!
  const signOut = async () => {
    await logout()
    navigate(pageRoutes.auth)
  }

  return (
    <MenuDropdown
      btnContent={
        <div className=" btn btn-circle btn-ghost btn-md">
          <SlOptions size={18} />
        </div>
      }
    >
      <MenuItems
        anchor="top end"
        className=" absolute z-[60] flex w-[240px] origin-bottom-right flex-col overflow-hidden rounded-xl bg-base-200 shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <MenuItem>
          <Link
            to={'/users/' + (user?.username || '')}
            className={` flex items-center gap-4 px-6 py-3 data-[focus]:bg-neutral data-[focus]:text-secondary`}
          >
            <IoSettingsOutline size={17} />
            <p>Manage Account</p>
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            onClick={signOut}
            className={` flex items-center gap-4 px-6 py-3 data-[focus]:bg-neutral data-[focus]:text-secondary`}
          >
            <PiSignOut size={17} />
            <p>Log out</p>
          </button>
        </MenuItem>
      </MenuItems>
    </MenuDropdown>
  )
}
