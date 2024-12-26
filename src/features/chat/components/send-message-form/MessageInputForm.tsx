import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageAttachmentOptions } from './MessageAttachmentOptions'
import { BiSend } from 'react-icons/bi'
import { MessageForm } from '../../schemas'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  addPendingChatMessage,
  selectSelectedConversation,
} from '@/src/redux/chat/chatSlice'
import { isScrolledToBottom } from '../../common/scrollHelpers'
import { useSendMessage } from '../../hooks/useSendMessage'

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
  const sendMessage = useSendMessage()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<MessageForm>({
    defaultValues: { text: '' },
  })

  const onSubmit: SubmitHandler<MessageForm> = (data) => {
    const messageId = crypto.randomUUID()
    const element = scrollElementRef.current
    if (element && isScrolledToBottom(element)) {
      triggerScrollToBottom()
    }
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
    sendMessage({ ...data, conversationId }, messageId)
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
