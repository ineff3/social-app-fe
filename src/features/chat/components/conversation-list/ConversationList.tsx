import { useGetConversations } from '../../hooks/useGetConversations'
import { ConversationRow } from './ConversationRow'
import { useAppSelector } from '@/src/redux/hooks'

import { useHandleIntersection } from '../../hooks/useHandleIntersection'
import { useGetOnlineUsers } from '../../hooks/useGetOnlineUsers'
import { useTrackUserStatus } from '../../hooks/useTrackUserStatus'
import { useTrackUserTyping } from '../../hooks/useTrackUserTyping'
import { selectSelectedConversationId } from '@/src/redux/chat/chatSlice'
import { ConversationSkeleton } from '../skeletons/ConversationSkeleton'

export const ROW_HEIGHT = 73

export const ConversationList = () => {
  const selectedConversationId = useAppSelector(selectSelectedConversationId)
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetConversations({
    limit: 10,
  })
  const { data: onlineUsersIds } = useGetOnlineUsers()
  useTrackUserStatus()
  useTrackUserTyping()
  const ref = useHandleIntersection(fetchNextPage)

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
      </div>
    )
  }
  const flattenedData = data?.pages.flatMap((page) => page.data)
  const activeIndex = flattenedData?.findIndex(
    (conversation) => conversation.id === selectedConversationId,
  )

  return (
    <div className="relative flex flex-col">
      {flattenedData &&
        flattenedData.map((conversation) => (
          <ConversationRow
            conversation={conversation}
            key={conversation.id}
            onlineUsersIds={onlineUsersIds}
          />
        ))}
      {hasNextPage && (
        <span
          ref={ref}
          className="loading loading-spinner loading-lg my-4 self-center"
        ></span>
      )}
      {selectedConversationId && activeIndex != undefined && (
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
