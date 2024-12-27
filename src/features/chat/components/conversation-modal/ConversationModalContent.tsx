import { CloseBtn } from '@/src/components/ui/CloseBtn'
import { UserSearch } from './UserSearch'
import { useCreateConversation } from '../../hooks/useCreateConversation'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'
import { useAppDispatch } from '@/src/redux/hooks'
import { selectConversation } from '@/src/redux/chat/chatSlice'

interface Props {
  close: () => void
}

export const ConversationModalContent = ({ close }: Props) => {
  const dispatch = useAppDispatch()
  const createConversationMutation = useCreateConversation()

  const createConversation = (user: SchemaUserPreviewResponseDto) => {
    createConversationMutation.mutate(
      { recipientId: user.id },
      {
        onSuccess: (conversation) => {
          console.log(conversation)
          dispatch(selectConversation(conversation))
        },
      },
    )

    close()
  }

  return (
    <div className=" flex min-h-[480px] flex-col gap-5">
      <div className="flex items-center gap-3">
        <CloseBtn onClick={close} />
        <span className="text-lg font-bold text-secondary">New message</span>
      </div>
      <UserSearch onSearchResultClick={createConversation} />
    </div>
  )
}
