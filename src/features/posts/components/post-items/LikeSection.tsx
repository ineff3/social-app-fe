import LikeIconSvg from '@/src/components/ui/icons/LikeIconSvg'
import useLikePost from '../../hooks/post-interactions/useLikePost'
import { QueryKey } from '@tanstack/react-query'
import { QueryUpdater } from '@/src/utils/api/interfaces'

interface Props {
  postId: string
  isLiked: boolean
  likesCount: number
  qKey: QueryKey
  updater?: QueryUpdater
}

const LikeSection = ({ postId, isLiked, likesCount, qKey, updater }: Props) => {
  const postLikeMutation = useLikePost(postId, qKey, updater)
  const onPostLike = () => {
    postLikeMutation.mutate()
  }
  return (
    <>
      <div data-tip="Like" className=" tooltip tooltip-secondary">
        <button
          aria-label="Like"
          onClick={onPostLike}
          className=" btn btn-circle btn-ghost btn-sm"
        >
          <div
            className={` transform transition duration-500 ${isLiked && 'animate-slide-up-and-down text-[#F61164]'}`}
          >
            <LikeIconSvg
              width={22}
              height={22}
              stroke={isLiked ? 'none' : 'currentColor'}
              strokeWidth={1.4}
              fill={isLiked ? 'currentColor' : 'none'}
            />
          </div>
        </button>
      </div>

      <p>{likesCount}</p>
    </>
  )
}

export default LikeSection
