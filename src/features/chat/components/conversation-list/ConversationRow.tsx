import UserIconLink from '@/src/components/ui/UserIconLink'
import { selectConversation } from '@/src/redux/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/types/schema'

interface Props {
  conv: SchemaConversationResponseDto
}

export const ConversationRow = ({ conv }: Props) => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(selectUserPreview)!.id

  const recipient = conv.participants.find(
    (participant) => participant.id !== currentUserId,
  )

  const handleSelectConversation = () => {
    dispatch(selectConversation(conv.id))
  }

  return (
    <div
      className="flex gap-3 px-3 py-3.5 transition-all duration-150 hover:bg-base-200 hover:bg-opacity-50"
      onClick={handleSelectConversation}
    >
      <UserIconLink username={recipient?.username} />
      <div className=" flex flex-col gap-1 text-sm">
        <div className="flex gap-1">
          <span className=" font-medium text-secondary">
            {recipient?.firstName}
          </span>
          <span>·</span>
          <span>{recipient?.username}</span>
          <span>·</span>
          <time dateTime={new Date().toISOString()}>8m</time>
        </div>
        <div>Hey there!!</div>
      </div>
    </div>
  )
}
