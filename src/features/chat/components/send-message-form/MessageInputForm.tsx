import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageAttachmentOptions } from './MessageAttachmentOptions'
import { BiSend } from 'react-icons/bi'
import { MessageForm } from '../../schemas'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  addPendingChatMessage,
  removePendingChatMessage,
  selectSelectedConversation,
  updatePendingMessageStatus,
} from '@/src/redux/chat/chatSlice'
import { conversationSocketInstance } from '../../conversationSocketInstance'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { ResponseAcknowledgement } from '../../interfaces'
import { isScrolledToBottom } from '../../common/scrollHelpers'

interface Props {
  scrollElementRef: React.RefObject<HTMLDivElement>
  triggerScrollToBottom: () => void
}

export const MessageInputForm = ({
  scrollElementRef,
  triggerScrollToBottom,
}: Props) => {
  const dispatch = useAppDispatch()
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
    dispatch(
      addPendingChatMessage({
        conversationId,
        message: {
          ...data,
          id,
          status: 'sending',
          createdAt: new Date().toISOString(),
        },
      }),
    )

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
              dispatch(
                updatePendingMessageStatus({
                  conversationId,
                  messageId: id,
                  status: 'failed',
                }),
              )
            } else if (response.status === 'success') {
              dispatch(
                removePendingChatMessage({ conversationId, messageId: id }),
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
