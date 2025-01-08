import { selectIsNextPageFetchEnabled } from '@/src/redux/chat/chatSlice'
import { useAppSelector } from '@/src/redux/hooks'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const useHandleIntersection = (handleIntersection: () => void) => {
  const { ref, inView } = useInView()
  const isNextPageFetchEnabled = useAppSelector(selectIsNextPageFetchEnabled)

  useEffect(() => {
    if (inView && isNextPageFetchEnabled) {
      handleIntersection()
    }
  }, [inView, handleIntersection, isNextPageFetchEnabled])

  return ref
}
