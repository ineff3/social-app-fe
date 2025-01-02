import UserIconLink from '@/src/components/ui/UserIconLink'
import {
  selectConversation,
  selectSelectedConversation,
} from '@/src/redux/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/types/schema'
import { ROW_HEIGHT } from './ConversationList'
import { formatConversationDate } from '@/src/features/posts/utils/dateConversions'
import { ConversationDropdownOptions } from './ConversationDropdownOptions'

interface Props {
  conversation: SchemaConversationResponseDto
}

export const ConversationRow = ({ conversation }: Props) => {
  const dispatch = useAppDispatch()
  const selectedConversationId = useAppSelector(selectSelectedConversation)?.id
  const currentUserId = useAppSelector(selectUserPreview)!.id

  const recipient = conversation.participants.find(
    (participant) => participant.user.id !== currentUserId,
  )

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
      <UserIconLink username={recipient?.user.username} />
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
        {conversation.lastMessage && (
          <div className="flex overflow-hidden">
            <p className="grow">{conversation.lastMessage.text}</p>
            {conversation.unreadAmount !== 0 && (
              <div className=" badge badge-secondary badge-sm mr-1.5 self-center">
                {conversation.unreadAmount}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
