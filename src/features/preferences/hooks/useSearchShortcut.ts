import { useEffect } from 'react'

export const useSearchShortcut = (ref: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (ref.current && e.code === 'KeyK' && (e.ctrlKey || e.metaKey)) {
        ref.current.focus()
      }
    }

    document.addEventListener('keydown', handleShortcut)

    return () => {
      removeEventListener('keydown', handleShortcut)
    }
  }, [ref])
}
