import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageAttachmentOptions } from './MessageAttachmentOptions'
import { BiSend } from 'react-icons/bi'
import { MessageForm } from '../../schemas'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  addPendingChatMessage,
  selectSelectedConversation,
} from '@/src/redux/chat/chatSlice'
import { useSendMessage } from '../../hooks/useSendMessage'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { useHandleUserTyping } from '../../hooks/useHandleUserTyping'

interface Props {
  triggerScrollToBottom: () => void
}

export const MessageInputForm = ({ triggerScrollToBottom }: Props) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const dispatch = useAppDispatch()
  const conversationId = useAppSelector(selectSelectedConversation)!.id
  const sendMessage = useSendMessage()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<MessageForm>({
    defaultValues: { text: '' },
  })
  const { handleKeyDown, triggerStopTyping } = useHandleUserTyping(
    currentUserId,
    conversationId,
  )

  const onSubmit: SubmitHandler<MessageForm> = (data) => {
    const messageId = crypto.randomUUID()
    triggerScrollToBottom()
    dispatch(
      addPendingChatMessage({
        conversationId,
        message: {
          ...data,
          id: messageId,
          status: 'sending',
          conversationId,
          createdAt: new Date().toISOString(),
        },
      }),
    )
    reset()
    triggerStopTyping()
    sendMessage({ ...data, conversationId }, messageId)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex items-center gap-2  p-4"
    >
      <MessageAttachmentOptions />
      <label
        onKeyDown={handleKeyDown}
        className="input input-bordered input-accent flex flex-grow items-center gap-2 bg-base-100"
      >
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
