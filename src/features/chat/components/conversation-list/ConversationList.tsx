import { useEffect } from 'react'
import { useGetConversations } from '../../hooks/useGetConversations'
import { useInView } from 'react-intersection-observer'
import { ConversationRow } from './ConversationRow'
import { useAppSelector } from '@/src/redux/hooks'
import { selectSelectedConversation } from '@/src/redux/chat/chatSlice'

export const ROW_HEIGHT = 73

export const ConversationList = () => {
  const isSelected = useAppSelector(selectSelectedConversation)
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetConversations({
    limit: 10,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className=" loading-spinner loading-md" />
      </div>
    )
  }
  const flattenedData = data?.pages.flatMap((page) => page.data)
  const activeIndex = flattenedData?.findIndex(
    (conversation) => conversation.id === isSelected?.id,
  )

  return (
    <div className="relative flex flex-col">
      {flattenedData &&
        flattenedData.map((conversation) => (
          <ConversationRow conversation={conversation} key={conversation.id} />
        ))}
      {hasNextPage && (
        <span
          ref={ref}
          className="loading loading-spinner loading-lg my-4 self-center"
        ></span>
      )}
      {isSelected && activeIndex != undefined && (
        <div
          className="absolute right-0 top-0 w-[3.5px] bg-primary transition-all duration-[0.2s]"
          style={{
            height: `${ROW_HEIGHT}px`,
            marginTop: `${activeIndex * ROW_HEIGHT}px`,
          }}
        />
      )}
    </div>
  )
}
