import {
  selectChatScrollPosition,
  setChatScrollPosition,
} from '@/src/redux/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { useLayoutEffect } from 'react'

export const useRestoreChatScrollPosition = (
  scrollElementRef: React.RefObject<HTMLElement>,
  conversationId: string,
) => {
  const storedScrollPosition = useAppSelector(
    selectChatScrollPosition(conversationId),
  )
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    const element = scrollElementRef.current
    if (storedScrollPosition && element) {
      element.scrollTop = storedScrollPosition
    }

    return () => {
      if (element) {
        dispatch(setChatScrollPosition({ [conversationId]: element.scrollTop }))
      }
    }
  }, [conversationId, dispatch, scrollElementRef, storedScrollPosition])
}
