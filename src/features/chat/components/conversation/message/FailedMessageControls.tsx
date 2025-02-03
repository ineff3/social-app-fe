import { CircleButton } from '@/src/components/ui/buttons/CircleButton'
import { RestartIcon } from '@/src/components/ui/icons/RestartIcon'
import {
  removePendingChatMessage,
  updatePendingMessageStatus,
} from '@/src/redux/chat/chatSlice'
import { useAppDispatch } from '@/src/redux/hooks'
import { TriggerScrollToBottom } from '../../../hooks/useTriggerScrollToBottom'
import { ExtendedChatMessage } from '../../../interfaces'
import { useSendMessage } from '../../../hooks/useSendMessage'

interface Props {
  message: ExtendedChatMessage
  triggerScrollToBottom: TriggerScrollToBottom
}

export const FailedMessageControls = ({
  message,
  triggerScrollToBottom,
}: Props) => {
  const dispatch = useAppDispatch()
  const sendMessage = useSendMessage(triggerScrollToBottom)

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
  )
}
