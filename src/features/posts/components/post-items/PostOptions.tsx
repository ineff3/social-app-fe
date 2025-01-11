import { GoTrash } from 'react-icons/go'
import useDeletePost from '../../hooks/useDeletePost'
import { DropdownMenu } from '@/src/components/ui/dropdown-menu/DropdownMenu'
import { DropdownItem } from '@/src/common/types'

interface Props {
  isPostAuthor: boolean
  postId: string
}

const PostOptions = ({ isPostAuthor, postId }: Props) => {
  const deletePostMutation = useDeletePost()
  const onDeletePost = () => {
    deletePostMutation.mutate(postId)
  }
  const dropdownItems: DropdownItem[] = []
  if (isPostAuthor) {
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
