import UserIconLink from '@/src/components/ui/UserIconLink'
import {
  selectConversation,
  selectSelectedConversation,
  selectTypingUser,
} from '@/src/redux/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/types/schema'
import { ROW_HEIGHT } from './ConversationList'
import { formatConversationDate } from '@/src/features/posts/utils/dateConversions'
import { ConversationDropdownOptions } from './ConversationDropdownOptions'

interface Props {
  conversation: SchemaConversationResponseDto
  onlineUsersIds: string[] | undefined
}

export const ConversationRow = ({ conversation, onlineUsersIds }: Props) => {
  const dispatch = useAppDispatch()
  const conversationTypingUsers = useAppSelector(
    selectTypingUser(conversation.id),
  )
  const selectedConversationId = useAppSelector(selectSelectedConversation)?.id
  const currentUserId = useAppSelector(selectUserPreview)!.id

  const recipient = conversation.participants.find(
    (participant) => participant.user.id !== currentUserId,
  )
  const isUserOnline =
    onlineUsersIds && onlineUsersIds.find((id) => id === recipient?.user.id)
  const isUserTyping =
    conversationTypingUsers &&
    conversationTypingUsers.find((id) => id === recipient?.user.id)

  const handleSelectConversation = (e: React.MouseEvent) => {
    const isInteractiveElement = (e.target as HTMLElement).closest(
      'button, a, [data-interactive="true"]',
    )
    if (!isInteractiveElement) {
      dispatch(selectConversation(conversation))
    }
  }
  const isSelected = conversation.id === selectedConversationId
  const lastMessageDate = conversation.lastMessage
    ? formatConversationDate(new Date(conversation.lastMessage.createdAt))
    : undefined

  return (
    <div
      className={`flex gap-3 px-4 py-3.5 transition-all duration-150 hover:bg-base-200 hover:bg-opacity-70 ${isSelected && 'bg-base-200'}`}
      style={{ height: `${ROW_HEIGHT}px` }}
      onClick={handleSelectConversation}
    >
      <div className="relative">
        <UserIconLink username={recipient?.user.username} />
        {isUserOnline && (
          <div
            className={`absolute bottom-0 right-0 rounded-full bg-base-100 ${isSelected && 'bg-base-200'} p-[3px]`}
          >
            <div className=" h-2.5 w-2.5 rounded-full bg-primary"></div>
          </div>
        )}
      </div>
      <div className=" flex flex-grow flex-col  text-sm">
        <div className=" flex justify-between">
          <div className="flex gap-1">
            <span className=" font-medium text-secondary">
              {recipient?.user.firstName}
            </span>

            {lastMessageDate && (
              <>
                <span>·</span>
                <time dateTime={conversation.lastMessage.createdAt}>
                  {lastMessageDate}
                </time>
              </>
            )}
          </div>
          <ConversationDropdownOptions conversationId={conversation.id} />
        </div>
        <div className="flex w-full">
          <div className="grow overflow-hidden">
            {isUserTyping ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-dots loading-xs"></span>
                <span className=" font-medium">typing</span>
              </div>
            ) : (
              <p className=" max-w-[290px] overflow-hidden text-ellipsis whitespace-nowrap">
                {conversation.lastMessage.text}
              </p>
            )}
          </div>
          {conversation.unreadAmount !== 0 && (
            <div className=" badge badge-secondary badge-sm mr-1.5 self-center">
              {conversation.unreadAmount}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
