import { DropdownMenu } from '@/src/components/ui/dropdown-menu/DropdownMenu'
import RepostIconSvg from '@/src/components/ui/icons/RepostIconSvg'
import { DropdownItem } from '@/src/common/types'
import { RepostButton } from './RepostButton'
import { FaRegPenToSquare } from 'react-icons/fa6'
import useCreatePost from '../../../hooks/useCreatePost'
import useDeletePost from '../../../hooks/useDeletePost'
import { useLocation, useNavigate } from 'react-router-dom'
import { pageRoutes } from '@/src/routes'
import { SchemaPostResponseDto } from '@/src/generated/schema'
import { PostCreationLocationState } from '../../../interfaces'

interface Props {
  postId: string
  actualPost: SchemaPostResponseDto
}

export const RepostSection = ({ postId, actualPost }: Props) => {
  const createPostMutation = useCreatePost()
  const deletePostMutation = useDeletePost()
  const navigate = useNavigate()
  const location = useLocation()

  const handleRepost = () => {
    if (actualPost.isReposted) {
      deletePostMutation.mutate(postId)
    } else {
      createPostMutation.mutate({ repostedId: postId })
    }
  }
  const handleQuote = () => {
    navigate(pageRoutes.createPost, {
      state: {
        backgroundLocation: location,
        repost: actualPost,
      } as PostCreationLocationState,
    })
  }

  const items: DropdownItem[] = [
    {
      title: actualPost.isReposted ? 'Undo repost' : 'Repost',
      value: 'repost',
      Icon: RepostIconSvg,
      iconProps: {
        width: 22,
        height: 22,
        fill: 'currentColor',
      },
      action: handleRepost,
    },
    {
      title: 'Quote',
      value: 'quote',
      Icon: FaRegPenToSquare,
      iconProps: {
        width: 22,
        height: 22,
      },
      action: handleQuote,
    },
  ]

  return (
    <>
      <div
        data-tip="Repost"
        className={` tooltip tooltip-secondary z-10 ${actualPost.isReposted && 'text-success'}`}
      >
        <DropdownMenu
          items={items}
          anchor="bottom start"
          OpenButton={RepostButton}
          isMinimized={true}
        />
      </div>
      <p>{actualPost.reposts}</p>
    </>
  )
}
