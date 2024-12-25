import { CheckmarkIcon } from '@/src/components/ui/icons/CheckmarkIcon'
import { DoubleCheckmarkIcon } from '@/src/components/ui/icons/DoubleCheckmarkIcon'
import { formatMessageDate } from '@/src/features/posts/utils/dateConversions'
import { ExtendedChatMessage } from '../../interfaces'

interface Props {
  message: ExtendedChatMessage
  isFromCurrentUser: boolean
}

export const Message = ({ message, isFromCurrentUser }: Props) => {
  return (
    <div className={`chat ${isFromCurrentUser ? 'chat-end' : 'chat-start'}`}>
      <div
        className={`chat-bubble !min-h-[40px] text-secondary ${isFromCurrentUser && 'bg-primary'}`}
      >
        <div className=" flex flex-wrap gap-3">
          <span className=" inline-block">{message.text}</span>
          {isFromCurrentUser && (
            <div className=" flex flex-grow items-center justify-end gap-1 self-end text-xs italic text-secondary">
              <time dateTime={message.createdAt}>
                {formatMessageDate(new Date(message.createdAt))}
              </time>
              <span>
                {message.status === 'sending' && (
                  <span className="loading loading-spinner !w-[13px]"></span>
                )}
                {message.status === 'sent' && (
                  <CheckmarkIcon width={12} height={12} stroke="white" />
                )}
                {message.status === 'read' && (
                  <DoubleCheckmarkIcon width={12} height={12} stroke="white" />
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
