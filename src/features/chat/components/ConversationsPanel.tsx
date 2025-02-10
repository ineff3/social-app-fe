import { FaRegPenToSquare } from 'react-icons/fa6'
import { ConversationList } from './conversation-list/ConversationList'
import { CircleButton } from '@/src/components/ui/buttons/CircleButton'

interface Props {
  show: () => void
}

export const ConversationsPanel = ({ show }: Props) => {
  return (
    <>
      <div className=" flex min-h-screen w-full flex-grow flex-col gap-5 border-r border-accent py-4 lg:max-w-[420px]">
        <div className="flex items-center justify-between px-4 text-secondary">
          <span className="text-lg font-bold">Messages</span>
          <CircleButton
            size="sm"
            tooltipPosition="bottom"
            onClick={show}
            label="New message"
          >
            <FaRegPenToSquare size={18} />
          </CircleButton>
        </div>
        <ConversationList />
      </div>
    </>
  )
}
