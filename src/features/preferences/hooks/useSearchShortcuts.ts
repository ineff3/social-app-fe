import { useEffect } from 'react'

export const useSearchShortcuts = (
  ref: React.RefObject<HTMLInputElement>,
  closeList: () => void,
) => {
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      const el = ref.current
      if (!el) {
        return
      }

      if (e.code === 'KeyK' && (e.ctrlKey || e.metaKey)) {
        el.focus()
      } else if (e.code === 'Escape') {
        el.blur()
        closeList()
      } else if (e.code === 'Tab' && el === document.activeElement) {
        closeList()
      }
    }

    document.addEventListener('keydown', handleShortcut)

    return () => {
      document.removeEventListener('keydown', handleShortcut)
    }
  }, [ref, closeList])
}
