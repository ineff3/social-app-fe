import { CheckmarkIcon } from '@/src/components/ui/icons/CheckmarkIcon'
import { DoubleCheckmarkIcon } from '@/src/components/ui/icons/DoubleCheckmarkIcon'
import { formatMessageDate } from '@/src/features/posts/utils/dateConversions'
import { ExtendedChatMessage } from '../../interfaces'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { RestartIcon } from '@/src/components/ui/icons/RestartIcon'
import { CircleButton } from '@/src/components/ui/CircleButton'

interface Props {
  message: ExtendedChatMessage
  isFromCurrentUser: boolean
}

export const Message = ({ message, isFromCurrentUser }: Props) => {
  const { status } = message
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
                  <DoubleCheckmarkIcon width={12} height={12} stroke="white" />
                )}
              </span>
            </div>
          )}
        </div>
        {status === 'failed' && (
          <div className="absolute -left-[40%] top-1/2 flex -translate-y-1/2 gap-2">
            <CircleButton
              tooltipPosition="top"
              onClick={() => {}}
              label="Remove"
              isGhost={false}
              size="sm"
            >
              <span className="text-secondary">✕</span>
            </CircleButton>
            <CircleButton
              tooltipPosition="top"
              onClick={() => {}}
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
