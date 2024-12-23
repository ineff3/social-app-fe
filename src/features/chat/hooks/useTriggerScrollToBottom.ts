import { useEffect, useState } from 'react'
import { scrollToBottom } from '../common/scrollHelpers'

export const useTriggerScrollToBottom = (
  elementRef: React.RefObject<HTMLDivElement>,
) => {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (shouldScrollToBottom && element) {
      scrollToBottom(element)
      setShouldScrollToBottom(false)
    }
  }, [shouldScrollToBottom, elementRef])

  const triggerScrollToBottom = () => {
    setShouldScrollToBottom(true)
  }

  return triggerScrollToBottom
}
