import { FaRegPenToSquare } from 'react-icons/fa6'
import { ConversationList } from './conversation-list/ConversationList'
import { CircleButton } from '@/src/components/ui/buttons/CircleButton'

interface Props {
  show: () => void
}

export const ConversationsPanel = ({ show }: Props) => {
  return (
    <>
      <div className=" flex min-h-screen w-full flex-grow flex-col border-r border-accent py-4 lg:max-w-[420px]">
        <div className="flex items-center justify-between px-4 text-secondary">
          <span className="text-lg font-bold">Conversations</span>
          <CircleButton
            size="sm"
            tooltipPosition="bottom"
            onClick={show}
            label="New conversation"
          >
            <FaRegPenToSquare size={18} />
          </CircleButton>
        </div>
        <div className=" divider  divider-accent mt-2 px-4 "></div>
        <ConversationList />
      </div>
    </>
  )
}
