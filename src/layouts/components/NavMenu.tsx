import { BookmarkIcon } from '@/src/components/ui/icons/nav-menu/BookmarkIcon'
import { HomeIcon } from '@/src/components/ui/icons/nav-menu/HomeIcon'
import { MessageIcon } from '@/src/components/ui/icons/nav-menu/MessageIcon'
import { NotificationIcon } from '@/src/components/ui/icons/nav-menu/NotificationIcon'
import { ProfileIcon } from '@/src/components/ui/icons/nav-menu/ProfileIcon'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { NavLink, useLocation } from 'react-router-dom'
import { NotificationBadge } from './NotificationBadge'
import { pageRoutes } from '@/src/routes'
import { toPx, toS } from '@/src/common/converters'

const ICON_SIZE = 20
const LINK_HEIGHT = 52
const TRANSITION_DURATION = 0.25

const generateMenuItems = (username: string) => [
  {
    path: pageRoutes.home,
    name: 'Home',
    svg: <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    path: pageRoutes.notifications,
    name: 'Notifications',
    svg: <NotificationIcon width={ICON_SIZE} height={ICON_SIZE} />,
    badge: <NotificationBadge />,
  },
  {
    path: pageRoutes.conversations,
    name: 'Messages',
    svg: <MessageIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    path: pageRoutes.bookmarks,
    name: 'Bookmarks',
    svg: <BookmarkIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    path: `/users/${username}`,
    name: 'Profile',
    svg: <ProfileIcon width={ICON_SIZE} height={ICON_SIZE} />,
  }
]

export const NavMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const user = useAppSelector(selectUserPreview)!
  const location = useLocation()
  const linkStyles = ' rounded-none px-7 py-3 transition-color'
  const activeLinkStyles = linkStyles + ' !text-secondary !bg-transparent '

  const menuItems = generateMenuItems(user?.username)

  const activeIndex = menuItems.findIndex(
    (item) => item.path === location.pathname,
  )

  return (
    <nav className="relative">
      <ul className="menu p-0 text-base-content">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive ? activeLinkStyles : linkStyles
              }
              style={{
                height: toPx(LINK_HEIGHT),
                transitionDuration: toS(TRANSITION_DURATION),
              }}
              to={item.path}
              onClick={closeMenu}
              aria-label={item.name}
            >
              <div className=" relative">
                {item.svg}
                {item.badge && item.badge}
              </div>
              <p className=" text-lg sm:hidden xl:block ">{item.name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
      {activeIndex !== -1 && (
        <div
          className="absolute left-0 top-0 w-[3.5px] bg-primary shadow-[35px_0px_60px_20px_rgba(26,92,255,1)] transition-all"
          style={{
            height: toPx(LINK_HEIGHT),
            marginTop: toPx(activeIndex * LINK_HEIGHT),
            transitionDuration: toS(TRANSITION_DURATION),
          }}
        />
      )}
    </nav>
  )
}
