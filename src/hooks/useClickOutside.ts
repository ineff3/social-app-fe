import { useEffect } from 'react'

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onCLickOutside: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onCLickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, onCLickOutside])
}
