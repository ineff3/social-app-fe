import { GoTrash } from 'react-icons/go'
import useDeletePost from '../../hooks/useDeletePost'
import { DropdownMenu } from '@/src/components/ui/dropdown-menu/DropdownMenu'
import { DropdownItem } from '@/src/common/types'

interface Props {
  hasDeletePermission?: boolean
  isPostAuthor: boolean
  postId: string
}

const PostOptions = ({ isPostAuthor, postId, hasDeletePermission }: Props) => {
  const deletePostMutation = useDeletePost(hasDeletePermission)
  const onDeletePost = () => {
    deletePostMutation.mutate(postId)
  }
  const dropdownItems: DropdownItem[] = []
  if (isPostAuthor || hasDeletePermission) {
    dropdownItems.push({
      title: 'Delete',
      value: 'delete',
      Icon: GoTrash,
      action: onDeletePost,
      dangerItem: true,
    })
  }

  return <DropdownMenu anchor="bottom end" items={dropdownItems} />
}

export default PostOptions
