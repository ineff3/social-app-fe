import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageAttachmentOptions } from './MessageAttachmentOptions'
import { BiSend } from 'react-icons/bi'
import { MessageForm } from '../../schemas'
import { useAppSelector } from '@/src/redux/hooks'
import { selectSelectedConversation } from '@/src/redux/chat/chatSlice'
import { conversationSocketInstance } from '../../conversationSocketInstance'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { PendingMessageType, ResponseAcknowledgement } from '../../interfaces'
import { isScrolledToBottom } from '../../common/scrollHelpers'

interface Props {
  scrollElementRef: React.RefObject<HTMLDivElement>
  setPendingMessages: React.Dispatch<React.SetStateAction<PendingMessageType[]>>
  triggerScrollToBottom: () => void
}

export const MessageInputForm = ({
  scrollElementRef,
  setPendingMessages,
  triggerScrollToBottom,
}: Props) => {
  const conversationId = useAppSelector(selectSelectedConversation)!.id
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<MessageForm>({
    defaultValues: { text: '' },
  })

  const onSubmit: SubmitHandler<MessageForm> = (data) => {
    const id = crypto.randomUUID()
    const element = scrollElementRef.current
    if (element && isScrolledToBottom(element)) {
      triggerScrollToBottom()
    }
    setPendingMessages((prev) => [...prev, { ...data, id, status: 'sending' }])

    conversationSocketInstance.emit(
      'sendMessage',
      { ...data, conversationId },
      (response: ResponseAcknowledgement) => {
        queryClient
          .invalidateQueries({
            queryKey: queryKeyStore.chat.messages({}, conversationId).queryKey,
          })
          .then(() => {
            if (response.status === 'error') {
              setPendingMessages((prev) =>
                prev.map((message) =>
                  message.id === id
                    ? { ...message, status: 'failed' }
                    : message,
                ),
              )
            } else if (response.status === 'success') {
              setPendingMessages((prev) =>
                prev.filter((message) => message.id !== id),
              )
            }
          })
      },
    )
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex items-center gap-2  p-4"
    >
      <MessageAttachmentOptions />
      <label className="input input-bordered input-accent flex flex-grow items-center gap-2 bg-base-100">
        <input
          {...register('text')}
          className="flex flex-grow"
          placeholder="Start a new message"
        />
        <button
          type="submit"
          aria-label="Send message"
          className={`btn btn-circle btn-ghost btn-sm text-primary ${!isDirty && 'btn-disabled '}`}
        >
          <BiSend size={20} />
        </button>
      </label>
    </form>
  )
}
