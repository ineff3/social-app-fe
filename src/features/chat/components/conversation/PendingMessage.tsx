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
      </div>
      <p>{pendingMessage.status}</p>
    </div>
  )
}
