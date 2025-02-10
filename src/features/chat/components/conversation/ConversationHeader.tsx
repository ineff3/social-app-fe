import { CircleButton } from '@/src/components/ui/buttons/CircleButton'
import ArrowIconSvg from '@/src/components/ui/icons/ArrowIconSvg'
import { selectConversation } from '@/src/redux/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { ConversationHeaderProps } from '../../interfaces'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { retrieveRecipient } from '../../common/conversationHelpers'

export const ConversationHeader = ({
  conversation,
}: ConversationHeaderProps) => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(selectUserPreview)!.id

  const recipient = retrieveRecipient(conversation, currentUserId)!

  return (
    <header className="flex h-[60px] w-full items-center gap-1 border-b border-r border-accent bg-base-100 px-4">
      <div className="lg:hidden">
        <CircleButton
          onClick={() => {
            dispatch(selectConversation(null))
          }}
          label="Back"
          tooltipPosition="bottom"
          size="sm"
        >
          <ArrowIconSvg width={15} height={15} className="fill-secondary" />
        </CircleButton>
      </div>
      <p className="p-4 text-lg font-bold text-secondary">
        {recipient?.user.firstName}
      </p>
    </header>
  )
}
