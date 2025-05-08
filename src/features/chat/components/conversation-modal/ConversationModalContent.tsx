import { UserSearch } from './UserSearch'
import { useCreateConversation } from '../../hooks/useCreateConversation'
import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'
import { useAppDispatch } from '@/src/redux/hooks'
import { selectConversation } from '@/src/redux/chat/chatSlice'
import { AxiosError } from 'axios'
import { useGetDirectConversation } from '../../hooks/useGetDirectConversation'
import { useEffect, useState } from 'react'
import { CloseCircleButton } from '@/src/components/ui/buttons/CloseCircleButton'

interface Props {
  close: () => void
}

export const ConversationModalContent = ({ close }: Props) => {
  const [recipientId, setRecipientId] = useState<string>('')
  const dispatch = useAppDispatch()
  const createConversationMutation = useCreateConversation()
  const { data, isLoading } = useGetDirectConversation(
    { recipientId },
    !!recipientId,
  )

  useEffect(
    function selectExistingConversation() {
      if (!isLoading && data) {
        dispatch(selectConversation(data.id))
      }
    },
    [data, isLoading, dispatch],
  )

  // SearchList keydown navigation cause page scrolls.
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const createConversation = (user: SchemaUserPreviewResponseDto) => {
    createConversationMutation.mutate(
      { recipientId: user.id },
      {
        onError: (err) => {
          if (err instanceof AxiosError && err.response?.status === 409) {
            setRecipientId(user.id)
          }
        },
        onSuccess: (conversation) => {
          dispatch(selectConversation(conversation.id))
        },
      },
    )

    close()
  }

  return (
    <div className=" flex min-h-[480px] flex-col gap-5">
      <div className="flex items-center gap-3">
        <CloseCircleButton onClick={close} />
        <span className="text-lg font-bold text-secondary">
          New conversation
        </span>
      </div>
      <UserSearch onSearchResultClick={createConversation} />
    </div>
  )
}
