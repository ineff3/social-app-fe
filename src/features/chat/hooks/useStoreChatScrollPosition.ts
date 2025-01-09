import { setChatScrollPosition } from '@/src/redux/chat/chatSlice'
import { useAppDispatch } from '@/src/redux/hooks'
import { useLayoutEffect } from 'react'

export const useStoreChatScrollPosition = (
  scrollElementRef: React.RefObject<HTMLElement>,
  conversationId: string,
  isLoading: boolean,
) => {
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    const element = scrollElementRef.current

    return () => {
      if (element && !isLoading) {
        dispatch(setChatScrollPosition({ [conversationId]: element.scrollTop }))
      }
    }
  }, [conversationId, dispatch, scrollElementRef, isLoading])
}
