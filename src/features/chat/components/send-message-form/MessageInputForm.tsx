import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageAttachmentOptions } from './MessageAttachmentOptions'
import { BiSend } from 'react-icons/bi'
import { MessageForm, messageValidationSchema } from '../../schemas'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  addPendingChatMessage,
  selectSelectedConversationId,
} from '@/src/redux/chat/chatSlice'
import { useSendMessage } from '../../hooks/useSendMessage'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { useHandleUserTyping } from '../../hooks/useHandleUserTyping'
import { TriggerScrollToBottom } from '../../hooks/useTriggerScrollToBottom'
import { useCheckHasNextUnreadPage } from '../../hooks/useCheckHasNextUnreadPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

interface Props {
  triggerScrollToBottom: TriggerScrollToBottom
}

export const MessageInputForm = ({ triggerScrollToBottom }: Props) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const dispatch = useAppDispatch()
  const selectedConversationId = useAppSelector(selectSelectedConversationId)!
  const sendMessage = useSendMessage(triggerScrollToBottom)
  const [caretPosition, setCaretPosition] = useState<number>(0)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isDirty },
  } = useForm<MessageForm>({
    resolver: zodResolver(messageValidationSchema),
    defaultValues: { text: '' },
  })
  const { handleKeyDown, triggerStopTyping } = useHandleUserTyping(
    currentUserId,
    selectedConversationId,
  )
  const checkHasNextUnreadPage = useCheckHasNextUnreadPage()

  const onSubmit: SubmitHandler<MessageForm> = (data) => {
    const messageId = crypto.randomUUID()
    const hasNextUnreadPage = checkHasNextUnreadPage(selectedConversationId)
    if (!hasNextUnreadPage) {
      triggerScrollToBottom('instant')
    }
    dispatch(
      addPendingChatMessage({
        conversationId: selectedConversationId,
        message: {
          ...data,
          id: messageId,
          status: 'sending',
          conversationId: selectedConversationId,
          createdAt: new Date().toISOString(),
        },
      }),
    )
    reset()
    triggerStopTyping()
    sendMessage({ ...data, conversationId: selectedConversationId }, messageId)
  }

  const handleEmojiSelect = (emoji: string) => {
    const text = getValues('text')
    const newText =
      text.slice(0, caretPosition) + emoji + text.slice(caretPosition)
    setValue('text', newText, { shouldDirty: true })
    setCaretPosition((prev) => prev + emoji.length)
  }

  const handleCaretPosition = (
    e:
      | React.MouseEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const input = e.currentTarget as HTMLInputElement
    setCaretPosition(input.selectionStart || 0)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex items-center gap-2  p-4"
    >
      <MessageAttachmentOptions handleEmojiSelect={handleEmojiSelect} />
      <label
        onKeyDown={handleKeyDown}
        className="input input-bordered input-accent flex flex-grow items-center gap-2 bg-base-100"
      >
        <input
          {...register('text')}
          className="flex flex-grow"
          placeholder="Start a new message"
          onClick={handleCaretPosition}
          onKeyUp={handleCaretPosition}
          onFocus={handleCaretPosition}
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
