import clsx from 'clsx'
import { MessageSkeleton } from './MessageSkeleton'

interface Props {
  isMinimized: boolean
}

export const ChatSkeleton = ({ isMinimized }: Props) => {
  return (
    <div className={clsx('flex flex-col gap-3', isMinimized ? 'p-2' : 'p-4')}>
      <MessageSkeleton position="start" height={40} width={150} />
      <MessageSkeleton position="start" height={40} width={260} />
      <MessageSkeleton position="end" height={40} width={250} />
      <MessageSkeleton position="start" height={40} width={280} />
      <MessageSkeleton position="end" height={450} width={455} />
    </div>
  )
}
