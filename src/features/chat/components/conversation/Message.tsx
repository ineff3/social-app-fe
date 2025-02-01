import { CheckmarkIcon } from '@/src/components/ui/icons/CheckmarkIcon'
import { DoubleCheckmarkIcon } from '@/src/components/ui/icons/DoubleCheckmarkIcon'
import { formatMessageDate } from '@/src/features/posts/utils/dateConversions'
import { ExtendedChatMessage } from '../../interfaces'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { RestartIcon } from '@/src/components/ui/icons/RestartIcon'
import { CircleButton } from '@/src/components/ui/buttons/CircleButton'
import { useSendMessage } from '../../hooks/useSendMessage'
import { useAppDispatch } from '@/src/redux/hooks'
import {
  removePendingChatMessage,
  updatePendingMessageStatus,
} from '@/src/redux/chat/chatSlice'
import { useReadMessage } from '../../hooks/useReadMessage'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { TriggerScrollToBottom } from '../../hooks/useTriggerScrollToBottom'

interface Props {
  message: ExtendedChatMessage
  isFromCurrentUser: boolean
  conversationId: string
  triggerScrollToBottom: TriggerScrollToBottom
}

export const Message = ({
  message,
  isFromCurrentUser,
  conversationId,
  triggerScrollToBottom,
}: Props) => {
  const { status } = message
  const dispatch = useAppDispatch()
  const sendMessage = useSendMessage(triggerScrollToBottom)
  const readMessage = useReadMessage()

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && !isFromCurrentUser && message.status !== 'read') {
      readMessage({ messageId: message.id, conversationId })
    }
  }, [inView, message, readMessage, isFromCurrentUser, conversationId])

  const resendPendingMessage = () => {
    dispatch(
      updatePendingMessageStatus({
        conversationId: message.conversationId,
        messageId: message.id,
        status: 'sending',
      }),
    )
    sendMessage(message, message.id)
  }

  const removePendingMessage = () => {
    dispatch(
      removePendingChatMessage({
        conversationId: message.conversationId,
        messageId: message.id,
      }),
    )
  }

  return (
    <div
      ref={ref}
      className={`chat ${isFromCurrentUser ? 'chat-end' : 'chat-start'}`}
    >
      <div
        className={`chat-bubble !min-h-[40px] !max-w-[85%] text-secondary ${isFromCurrentUser && 'bg-primary'}`}
      >
        <div className=" flex flex-wrap gap-x-3 gap-y-1">
          <div className="flex flex-col">
            {message.messageImages?.length > 0 &&
              message.messageImages.map((messageImage) => (
                <div
                  key={messageImage.id}
                  className="h-full max-h-[350px] w-full max-w-[350px]"
                >
                  <img
                    className="h-full w-full object-contain"
                    src={messageImage.imageUrl}
                  />
                </div>
              ))}
            {message.text && (
              <span className=" inline-block">{message.text}</span>
            )}
          </div>
          {isFromCurrentUser && (
            <div className=" flex flex-grow items-center justify-end gap-1 self-end text-xs italic text-secondary">
              <time dateTime={message.createdAt}>
                {formatMessageDate(new Date(message.createdAt))}
              </time>
              <span>
                {status === 'sending' && (
                  <span className="loading loading-spinner !w-[13px]"></span>
                )}
                {status === 'failed' && (
                  <MdOutlineErrorOutline size={18} className=" text-red-400" />
                )}
                {status === 'sent' && (
                  <CheckmarkIcon width={12} height={12} stroke="white" />
                )}
                {status === 'read' && (
                  <DoubleCheckmarkIcon width={16} height={16} stroke="white" />
                )}
              </span>
            </div>
          )}
        </div>
        {status === 'failed' && (
          <div className="absolute -left-[80px] top-1/2 flex -translate-y-1/2 gap-2">
            <CircleButton
              tooltipPosition="top"
              onClick={() => removePendingMessage()}
              label="Remove"
              isGhost={false}
              size="sm"
            >
              <span className="text-secondary">✕</span>
            </CircleButton>
            <CircleButton
              tooltipPosition="top"
              onClick={() => resendPendingMessage()}
              label="Resend"
              isGhost={false}
              size="sm"
            >
              <RestartIcon width={20} height={20} className="fill-secondary" />
            </CircleButton>
          </div>
        )}
      </div>
    </div>
  )
}
