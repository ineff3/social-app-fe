import { MdOutlineErrorOutline } from 'react-icons/md'
import { ExtendedChatMessageStatus } from '../../../interfaces'
import { CheckmarkIcon } from '@/src/components/ui/icons/CheckmarkIcon'
import { DoubleCheckmarkIcon } from '@/src/components/ui/icons/DoubleCheckmarkIcon'

interface Props {
  status: ExtendedChatMessageStatus
}

export const MessageStatus = ({ status }: Props) => {
  return (
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
        <DoubleCheckmarkIcon width={16} height={16} stroke="white" />
      )}
    </span>
  )
}
