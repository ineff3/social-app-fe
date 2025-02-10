import { useState } from 'react'
import { ConvPopoverHeader } from './ConvPopoverHeader'
import { useModal } from '@/src/hooks/useModal'
import Modal from '@/src/components/ui/Modal'
import { ConversationModalContent } from '../conversation-modal/ConversationModalContent'
import { ConvPopoverContent } from './ConvPopoverContent'
import { useAppSelector } from '@/src/redux/hooks'
import { selectSelectedConversationId } from '@/src/redux/chat/chatSlice'

export const ConversationPopover = () => {
  const isConversationSelected = useAppSelector(selectSelectedConversationId)
  const [isOpen, setIsOpen] = useState(false)
  const { show, close, visible } = useModal()

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <div className="fixed bottom-0 right-0 mr-8 w-[390px]">
        <div className="w-full rounded-t-xl border-x border-t border-accent bg-base-100 shadow-[0px_0px_11px_-5px_rgba(255,255,255,1)]">
          {!(isOpen && isConversationSelected) && (
            <ConvPopoverHeader
              isOpen={isOpen}
              onToggle={handleToggle}
              onNewMessage={show}
            />
          )}
          <ConvPopoverContent isOpen={isOpen} onToggle={handleToggle} />
        </div>
      </div>
      <Modal isOpen={visible} onClose={close} maxWidth="max-w-md">
        <ConversationModalContent close={close} />
      </Modal>
    </>
  )
}
