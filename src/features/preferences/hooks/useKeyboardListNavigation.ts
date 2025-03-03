import { Dispatch, SetStateAction, useEffect } from 'react'
import { UserSelectionHandler } from '../interfaces'
import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'

export const useKeyboardListNavigation = (
  selectedIndex: number,
  setSelectedIndex: Dispatch<SetStateAction<number>>,
  onClick: UserSelectionHandler,
  users?: SchemaUserPreviewResponseDto[],
) => {
  useEffect(() => {
    const handleSearchListNavigation = (e: KeyboardEvent) => {
      if (!users) {
        return
      }

      if (e.code === 'ArrowUp') {
        setSelectedIndex((prev) => (prev + users.length - 1) % users.length)
      } else if (e.code === 'ArrowDown') {
        setSelectedIndex((prev) => (prev + 1) % users.length)
      } else if (e.code === 'Enter') {
        onClick(users[selectedIndex])
      }
    }

    document.addEventListener('keydown', handleSearchListNavigation)

    return () => {
      document.removeEventListener('keydown', handleSearchListNavigation)
    }
  }, [selectedIndex, setSelectedIndex, onClick, users])
}
