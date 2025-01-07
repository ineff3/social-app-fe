import { useEffect, useState } from 'react'
import { scrollToBottom } from '../common/scrollHelpers'

export type TriggerScrollToBottom = (behavior?: ScrollBehavior) => void

export const useTriggerScrollToBottom = (
  elementRef: React.RefObject<HTMLDivElement>,
) => {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)
  const [scrollBehavior, setScrollBehavior] =
    useState<ScrollBehavior>('instant')

  useEffect(() => {
    const element = elementRef.current
    if (shouldScrollToBottom && element) {
      scrollToBottom(element, scrollBehavior)
      setShouldScrollToBottom(false)
    }
  }, [shouldScrollToBottom, elementRef, scrollBehavior])

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
