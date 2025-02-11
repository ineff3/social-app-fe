import { SubmitHandler } from 'react-hook-form'
import { MessageAttachmentOptions } from './MessageAttachmentOptions'
import { BiSend } from 'react-icons/bi'
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
import { useMessageFormContext } from '../../contexts/MessageFormContext'
import { MessagePictures } from './MessagePictures'
import { transformMessageData } from '../../common/transformMessageData'
import { SchemaMessageImageResponseDto } from '@/src/generated/schema'
import { MessageFormType } from '../../interfaces'

interface Props {
  triggerScrollToBottom: TriggerScrollToBottom
  isMinimized?: boolean
}

export const MessageInputForm = ({
  triggerScrollToBottom,
  isMinimized = false,
}: Props) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const dispatch = useAppDispatch()
  const selectedConversationId = useAppSelector(selectSelectedConversationId)!
  const sendMessage = useSendMessage(triggerScrollToBottom)

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
    setCaretPosition,
    isImageUploading,
  } = useMessageFormContext()!

  const { handleKeyDown, triggerStopTyping } = useHandleUserTyping(
    currentUserId,
    selectedConversationId,
  )
  const checkHasNextUnreadPage = useCheckHasNextUnreadPage()

  const onSubmit: SubmitHandler<MessageFormType> = (data) => {
    const messageId = crypto.randomUUID()
    const hasNextUnreadPage = checkHasNextUnreadPage(selectedConversationId)
    if (!hasNextUnreadPage) {
      triggerScrollToBottom('instant')
    }

    const messageImages = data.messageImages.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ file, ...rest }) =>
        ({ id: rest.id, ...rest.uploadData }) as SchemaMessageImageResponseDto,
    )

    dispatch(
      addPendingChatMessage({
        conversationId: selectedConversationId,
        message: {
          id: messageId,
          text: data.text,
          messageImages,
          status: 'sending',
          conversationId: selectedConversationId,
          createdAt: new Date().toISOString(),
        },
      }),
    )
    reset()
    triggerStopTyping()
    sendMessage(transformMessageData(data, selectedConversationId), messageId)
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
      className={` flex flex-col gap-2 ${isMinimized ? 'p-2' : 'p-4'}`}
    >
      <MessagePictures />
      <div className="flex w-full items-center gap-2">
        <MessageAttachmentOptions />
        <label
          onKeyDown={handleKeyDown}
          className="input input-bordered input-accent flex !min-w-[200px]  flex-grow items-center gap-2 bg-base-100"
        >
          <input
            {...register('text')}
            className="flex !min-w-[100px] flex-grow"
            placeholder="Start a message"
            onClick={handleCaretPosition}
            onKeyUp={handleCaretPosition}
            onFocus={handleCaretPosition}
          />
          <button
            type="submit"
            aria-label="Send message"
            className={`btn btn-circle btn-ghost btn-sm text-primary ${(!isDirty || isImageUploading) && 'btn-disabled '}`}
          >
            <BiSend size={20} />
          </button>
        </label>
      </div>
    </form>
  )
}
