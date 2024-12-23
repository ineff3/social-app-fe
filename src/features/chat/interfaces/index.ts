export interface ResponseAcknowledgement {
  status: 'success' | 'error'
  message?: string
}

export interface PendingMessageType {
  id: string
  text: string
  status: 'sending' | 'failed'
}
