import { DropdownMenu } from '@/src/components/ui/dropdown-menu/DropdownMenu'
import { GoTrash } from 'react-icons/go'
import { useDeleteConversation } from '../../hooks/useDeleteConversation'
import { DropdownItem } from '@/src/types'
import { ConversationDropdownButton } from './ConversationDropdownButton'
import { useAppDispatch } from '@/src/redux/hooks'
import { selectConversation } from '@/src/redux/chat/chatSlice'

interface Props {
  conversationId: string
}
export const ConversationDropdownOptions = ({ conversationId }: Props) => {
  const dispatch = useAppDispatch()
  const deleteConversationMutation = useDeleteConversation()
  const onDeleteConversation = () => {
    deleteConversationMutation.mutate(conversationId, {
      onSuccess: () => {
        dispatch(selectConversation(null))
      },
    })
  }
  const dropdownItems: DropdownItem[] = [
    {
      title: 'Delete',
      value: 'delete',
      Icon: GoTrash,
      action: onDeleteConversation,
      dangerItem: true,
    },
  ]

  return (
    <DropdownMenu
      OpenButton={ConversationDropdownButton}
      anchor="bottom end"
      items={dropdownItems}
    />
  )
}
