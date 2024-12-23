import { PendingMessageType } from '../../interfaces'

interface Props {
  pendingMessage: PendingMessageType
}

export const PendingMessage = ({ pendingMessage }: Props) => {
  return (
    <div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-primary">
          {pendingMessage.text}
        </div>
        {pendingMessage.status === 'sending' && (
          <div className="chat-footer opacity-50">
            <span className="loading loading-dots loading-sm "></span>
          </div>
        )}
      </div>
    </div>
  )
}
