import { useEffect, useState } from 'react'
import { scrollToBottom } from '../common/scrollHelpers'
import { useAppDispatch } from '@/src/redux/hooks'
import { setIsNextPageFetchEnabled } from '@/src/redux/chat/chatSlice'

export type TriggerScrollToBottom = (behavior?: ScrollBehavior) => void

export const useTriggerScrollToBottom = (
  elementRef: React.RefObject<HTMLDivElement>,
) => {
  const dispatch = useAppDispatch()
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)
  const [scrollBehavior, setScrollBehavior] =
    useState<ScrollBehavior>('instant')

  useEffect(() => {
    const element = elementRef.current
    if (shouldScrollToBottom && element) {
      scrollToBottom(element, scrollBehavior)
      dispatch(setIsNextPageFetchEnabled(true))
      setShouldScrollToBottom(false)
    }
  }, [shouldScrollToBottom, elementRef, scrollBehavior, dispatch])

  const triggerScrollToBottom: TriggerScrollToBottom = (
    behavior?: ScrollBehavior,
  ) => {
    if (behavior) {
      setScrollBehavior(behavior)
    }
    setShouldScrollToBottom(true)
  }

  return triggerScrollToBottom
}
