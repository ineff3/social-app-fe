import { BookmarkIcon } from '@/src/components/ui/icons/nav-menu/BookmarkIcon'
import { HomeIcon } from '@/src/components/ui/icons/nav-menu/HomeIcon'
import { MessageIcon } from '@/src/components/ui/icons/nav-menu/MessageIcon'
import { NotificationIcon } from '@/src/components/ui/icons/nav-menu/NotificationIcon'
import { PremiumIcon } from '@/src/components/ui/icons/nav-menu/PremiumIcon'
import { SearchIcon } from '@/src/components/ui/icons/nav-menu/SearchIcon'
import { NavLink, useLocation } from 'react-router-dom'

const ICON_SIZE = 20
const menuItems = [
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
    path: '/premium',
    name: 'Premium',
    svg: <PremiumIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
]
const LINK_HEIGHT = 52
const TRANSITION_DURATION = 0.25

const NavMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const location = useLocation()
  const linkStyles = ` rounded-none px-7 py-3 h-[${LINK_HEIGHT}px] transition-color duration-[${TRANSITION_DURATION}s] `
  const activeLinkStyles = linkStyles + ' !text-secondary !bg-transparent '

  const activeIndex = menuItems.findIndex(
    (item) => item.path === location.pathname,
  )

  return (
    <nav>
      <ul className="menu relative p-0 text-base-content">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeLinkStyles : linkStyles
              }
              to={item.path}
              onClick={closeMenu}
            >
              {item.svg}
              <p className=" text-lg sm:hidden lg:block ">{item.name}</p>
            </NavLink>
          </li>
        ))}
        <div
          className={`absolute left-0 w-[3.5px] bg-primary h-[${LINK_HEIGHT}px] top-0  transition-all duration-[${TRANSITION_DURATION}s]`}
          style={{
            marginTop: `${activeIndex * LINK_HEIGHT}px`,
          }}
        />
      </ul>
    </nav>
  )
}
export default NavMenu
