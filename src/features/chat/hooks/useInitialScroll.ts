import { selectChatScrollPosition } from '@/src/redux/chat/chatSlice'
import { useAppSelector } from '@/src/redux/hooks'
import { useEffect } from 'react'

interface Props {
  conversationId: string
  isLoading: boolean
  lastMessageRef: React.RefObject<HTMLDivElement>
  scrollElementRef: React.RefObject<HTMLDivElement>
}

const OVERSCROLL_HEIGHT = 200

export const useInitialScroll = ({
  conversationId,
  isLoading,
  lastMessageRef,
  scrollElementRef,
}: Props) => {
  const storedScrollPosition = useAppSelector(
    selectChatScrollPosition(conversationId),
  )

  useEffect(() => {
    const lastMessage = lastMessageRef.current
    const scrollElement = scrollElementRef.current

    if (!storedScrollPosition && !isLoading && lastMessage && scrollElement) {
      lastMessage.scrollIntoView(false)
      scrollElement.scrollBy(0, OVERSCROLL_HEIGHT)
    }
  }, [isLoading, scrollElementRef, lastMessageRef, storedScrollPosition])
}
