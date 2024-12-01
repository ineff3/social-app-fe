import { BookmarkIcon } from '@/src/components/ui/icons/nav-menu/BookmarkIcon'
import { HomeIcon } from '@/src/components/ui/icons/nav-menu/HomeIcon'
import { MessageIcon } from '@/src/components/ui/icons/nav-menu/MessageIcon'
import { NotificationIcon } from '@/src/components/ui/icons/nav-menu/NotificationIcon'
import { PremiumIcon } from '@/src/components/ui/icons/nav-menu/PremiumIcon'
import { ProfileIcon } from '@/src/components/ui/icons/nav-menu/ProfileIcon'
import { SearchIcon } from '@/src/components/ui/icons/nav-menu/SearchIcon'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { NavLink, useLocation } from 'react-router-dom'
import { NotificationBadge } from './NotificationBadge'

const ICON_SIZE = 20
const LINK_HEIGHT = 52
const TRANSITION_DURATION = 0.25

const generateMenuItems = (username: string) => [
  {
    path: '/',
    name: 'Home',
    svg: <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    path: '/search',
    name: 'Search',
    svg: <SearchIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    svg: <NotificationIcon width={ICON_SIZE} height={ICON_SIZE} />,
    badge: <NotificationBadge />,
  },
  {
    path: '/messages',
    name: 'Messages',
    svg: <MessageIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    svg: <BookmarkIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    path: username ? `/users/${username}` : '/users/:username',
    name: 'Profile',
    svg: <ProfileIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    path: '/premium',
    name: 'Premium',
    svg: <PremiumIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
]
// TODO:::
// Animation for horizontal tabs

//
const NavMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const user = useAppSelector(selectUserPreview)!
  const location = useLocation()
  const linkStyles = ` rounded-none px-7 py-3 transition-color duration-[${TRANSITION_DURATION}s] `
  const activeLinkStyles = linkStyles + ' !text-secondary !bg-transparent '

  const menuItems = generateMenuItems(user?.username)

  const activeIndex = menuItems.findIndex(
    (item) => item.path === location.pathname,
  )

  return (
    <nav>
      <ul className="menu relative p-0 text-base-content">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive ? activeLinkStyles : linkStyles
              }
              style={{
                height: `${LINK_HEIGHT}px`,
              }}
              to={item.path}
              onClick={closeMenu}
            >
              <div className=" relative">
                {item.svg}
                {item.badge && item.badge}
              </div>
              <p className=" text-lg sm:hidden lg:block ">{item.name}</p>
            </NavLink>
          </li>
        ))}
        {activeIndex !== -1 && (
          <div
            className={`absolute left-0 top-0 w-[3.5px] bg-primary  transition-all duration-[${TRANSITION_DURATION}s] shadow-[35px_0px_60px_20px_rgba(26,92,255,1)]`}
            style={{
              height: `${LINK_HEIGHT}px`,
              marginTop: `${activeIndex * 52}px`,
            }}
          />
        )}
      </ul>
    </nav>
  )
}
export default NavMenu
