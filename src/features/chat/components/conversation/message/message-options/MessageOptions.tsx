import { DropdownItem } from '@/src/common/types'
import { DropdownMenu } from '@/src/components/ui/dropdown-menu/DropdownMenu'
import { GoTrash } from 'react-icons/go'
import { ConversationDropdownButton } from '../../../conversation-list/ConversationDropdownButton'
import { useDeleteMessage } from '@/src/features/chat/hooks/useDeleteMessage'
import { CopyTextIcon } from '@/src/components/ui/icons/CopyTextIcon'
import { ExtendedChatMessage } from '@/src/features/chat/interfaces'

interface Props {
  message: ExtendedChatMessage
  conversationId: string
  isFromCurrentUser: boolean
  hasSingleImage: boolean
}

export const MessageOptions = ({
  message,
  conversationId,
  isFromCurrentUser,
  hasSingleImage,
}: Props) => {
  const deleteMessage = useDeleteMessage(conversationId)

  const dropdownItems: DropdownItem[] = []

  if (!hasSingleImage) {
    dropdownItems.push({
      title: 'Copy text',
      value: 'copy-text',
      Icon: CopyTextIcon,
      iconProps: {
        width: 22,
        height: 22,
        fill: 'none',
        stroke: 'currentColor',
      },
      action: async () => {
        try {
          await navigator.clipboard.writeText(message.text)
        } catch (err) {
          console.log(err)
        }
      },
    })
  }

  if (isFromCurrentUser) {
    dropdownItems.push({
      title: 'Delete',
      value: 'delete',
      Icon: GoTrash,
      action: () => deleteMessage({ messageId: message.id, conversationId }),
      dangerItem: true,
    })
  }

  return (
    <DropdownMenu
      OpenButton={ConversationDropdownButton}
      anchor={{ to: 'bottom', gap: -30 }}
      items={dropdownItems}
      disableBackground={true}
      isMinimized={true}
    />
  )
}
