import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const useHandleIntersection = (handleIntersection: () => void) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      handleIntersection()
    }
  }, [inView, handleIntersection])

  return ref
}
