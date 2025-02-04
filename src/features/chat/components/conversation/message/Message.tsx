import { ExtendedChatMessage } from '../../../interfaces'
import { useReadMessage } from '../../../hooks/useReadMessage'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { TriggerScrollToBottom } from '../../../hooks/useTriggerScrollToBottom'
import { FailedMessageControls } from './FailedMessageControls'
import { MessageCaption } from './MessageCaption'
import { MessagePicture } from './MessagePicture'

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
  const readMessage = useReadMessage()

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && !isFromCurrentUser && message.status !== 'read') {
      readMessage({ messageId: message.id, conversationId })
    }
  }, [inView, message, readMessage, isFromCurrentUser, conversationId])

  const hasImage = message.messageImages?.length > 0
  const hasSingleImage = hasImage && !message.text

  return (
    <div
      ref={ref}
      className={`chat ${isFromCurrentUser ? 'chat-end' : 'chat-start'}`}
    >
      <div
        className={`chat-bubble !min-h-[40px] !max-w-[85%] text-secondary ${isFromCurrentUser && 'bg-primary'} ${hasImage && 'p-[2px]'}`}
      >
        <div className=" flex flex-col gap-y-1 ">
          {hasImage &&
            message.messageImages.map((messageImage) => (
              <div className="relative" key={messageImage.id}>
                <MessagePicture
                  messageImage={messageImage}
                  hasSingleImage={hasSingleImage}
                />
                {hasSingleImage && (
                  <div className="absolute bottom-2 right-3">
                    <MessageCaption
                      message={message}
                      isFromCurrentUser={isFromCurrentUser}
                    />
                  </div>
                )}
              </div>
            ))}
          {!hasSingleImage && (
            <div
              className={`flex flex-wrap gap-x-3 gap-y-1 ${hasImage && 'px-4 pb-2'}`}
            >
              {message.text && <span>{message.text}</span>}
              <MessageCaption
                message={message}
                isFromCurrentUser={isFromCurrentUser}
              />
            </div>
          )}
        </div>
        {message.status === 'failed' && (
          <FailedMessageControls
            message={message}
            triggerScrollToBottom={triggerScrollToBottom}
          />
        )}
      </div>
    </div>
  )
}
