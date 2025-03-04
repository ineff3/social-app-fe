import { Outlet, useLocation } from 'react-router-dom'
import NavSidebar from './components/NavSidebar'
import NewsSidebar from './components/NewsSidebar'
import { CiMenuBurger } from 'react-icons/ci'
import { useState } from 'react'
import { pageRoutes } from '../routes'
import { ConversationPopover } from '../features/chat/components/conversation-popover/ConversationPopover'

const BaseLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1300px] flex-1 flex-col justify-between">
      <div className=" flex h-[50px] w-full items-center justify-end border-b border-accent px-2 sm:hidden">
        <button
          className=" btn btn-circle btn-ghost text-secondary"
          onClick={toggleMenu}
        >
          <CiMenuBurger size={20} />
        </button>
        {menuOpen && (
          <div className={`fixed left-0 top-0 z-50 h-full sm:hidden`}>
            <NavSidebar menuOpen closeMenu={closeMenu} />
          </div>
        )}
        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black opacity-50"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
      <div className=" flex w-full">
        <header className="hidden w-full max-w-[270px] sm:block sm:max-w-[75px] xl:max-w-[270px]">
          <NavSidebar menuOpen closeMenu={closeMenu} />
        </header>
        <main className=" w-full max-w-screen-lg ">
          <Outlet />
        </main>
        {location.pathname !== pageRoutes.conversations && (
          <div className=" hidden w-full  max-w-[360px] lg:block">
            <NewsSidebar />
          </div>
        )}
        {location.pathname !== pageRoutes.conversations && (
          <div className="hidden lg:block">
            <ConversationPopover />
          </div>
        )}
      </div>
    </div>
  )
}

export default BaseLayout
