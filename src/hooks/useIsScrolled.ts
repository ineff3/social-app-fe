import { useEffect, useState } from 'react'

export const useIsScrolled = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = document.body.scrollTop
      setIsScrolled(scrollPosition > 0)
    }

    document.body.addEventListener('scroll', handleScroll)

    return () => {
      document.body.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isScrolled
}
