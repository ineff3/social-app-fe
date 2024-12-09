import { useLayoutEffect } from 'react'
import {
  ScrollPositionKey,
  selectScrollPositions,
  setScrollPosition,
} from '../redux/user/userSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export const useRestoreScrollPosition = (
  scrollPositionKey?: ScrollPositionKey,
) => {
  const scrollPositions = useAppSelector(selectScrollPositions)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    let hasScrollCache = false
    if (scrollPositionKey) {
      const cachedScrollTop = scrollPositions[scrollPositionKey]
      hasScrollCache = cachedScrollTop !== 0
      if (hasScrollCache) {
        document.body.scrollTop = cachedScrollTop
        dispatch(
          setScrollPosition({
            [scrollPositionKey]: 0,
          } as Record<ScrollPositionKey, number>),
        )
      }
    }

    return () => {
      const scrolled = document.body.scrollTop
      if (scrollPositionKey && scrolled !== 0 && !hasScrollCache) {
        dispatch(
          setScrollPosition({
            [scrollPositionKey]: scrolled,
          } as Record<ScrollPositionKey, number>),
        )
      }
    }
  }, [scrollPositions, scrollPositionKey, dispatch])
}
