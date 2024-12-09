import { DropdownMenu } from '@/src/components/ui/dropdown-menu/DropdownMenu'
import { useLogout } from '@/src/features/authentication'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { pageRoutes } from '@/src/routes'
import { DropdownItem } from '@/src/types'
import { IoSettingsOutline } from 'react-icons/io5'
import { PiSignOut } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

export const UserPreviewDropdown = () => {
  const logout = useLogout()
  const navigate = useNavigate()
  const user = useAppSelector(selectUserPreview)!
  const signOut = async () => {
    await logout()
    navigate(pageRoutes.auth)
  }
  const redirectToProfile = () => {
    navigate('/users/' + (user?.username || ''))
  }
  const dropdownItems: DropdownItem[] = [
    {
      title: 'Manage Account',
      value: 'manage account',
      Icon: IoSettingsOutline,
      iconProps: {
        width: 17,
        height: 17,
      },
      action: redirectToProfile,
    },
    {
      title: 'Log out',
      value: 'log out',
      Icon: PiSignOut,
      iconProps: {
        width: 17,
        height: 17,
      },
      action: signOut,
    },
  ]

  return <DropdownMenu anchor="top end" items={dropdownItems} />
}
