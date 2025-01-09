import { RefObject, useEffect, useState } from 'react'

interface Props {
  scrolledElementRef: RefObject<HTMLElement>
}

export const useIsScrolled = ({ scrolledElementRef }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const element = scrolledElementRef.current
    const handleScroll = () => {
      if (element) {
        const scrollPosition = element.scrollTop
        setIsScrolled(scrollPosition > 0)
      }
    }
    if (element) {
      element.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrolledElementRef])

  return isScrolled
}
