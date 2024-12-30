import { selectChatScrollPosition } from '@/src/redux/chat/chatSlice'
import { useAppSelector } from '@/src/redux/hooks'
import { useEffect } from 'react'

interface Props {
  conversationId: string
  isLoading: boolean
  lastReadMessageRef: React.RefObject<HTMLDivElement>
  scrollElementRef: React.RefObject<HTMLDivElement>
}

const OVERSCROLL_HEIGHT = 200

export const useInitialScroll = ({
  conversationId,
  isLoading,
  lastReadMessageRef,
  scrollElementRef,
}: Props) => {
  const storedScrollPosition = useAppSelector(
    selectChatScrollPosition(conversationId),
  )

  useEffect(() => {
    const lastMessage = lastReadMessageRef.current
    const scrollElement = scrollElementRef.current

    if (!isLoading && lastMessage && scrollElement) {
      if (storedScrollPosition) {
        scrollElement.scrollTop = storedScrollPosition
      } else {
        lastMessage.scrollIntoView(false)
        scrollElement.scrollBy(0, OVERSCROLL_HEIGHT)
      }
    }
  }, [isLoading, scrollElementRef, lastReadMessageRef, storedScrollPosition])
}
