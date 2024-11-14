import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { usePostContext } from '../../contexts/PostContext'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGES_PER_POST,
} from '../../schemas/createPostSchema'
import { GifIcon, ScheduleIcon, StatsIcon } from '@/src/components/ui/icons'
import { AttachEmoji } from './additional-content/AttachEmoji'
import { AttachPicture } from './additional-content/AttachPicture'

export const PostFormFooter = () => {
  const {
    creationError,
    postImages,
    appendPostImage,
    appendEmoji,
    errors,
    isDirty,
    postIsPending,
  } = usePostContext()!

  const isFormInvalid =
    errors?.postImages || errors?.text || !isDirty || postIsPending

  return (
    <div>
      {creationError && <ErrorAlert errorMessage={creationError} />}
      <div className=" divider"></div>
      <div className=" flex  items-center justify-between">
        <div className=" flex items-center gap-1.5 ">
          <AttachPicture
            maxFilesAttached={postImages.length >= MAX_IMAGES_PER_POST}
            append={appendPostImage}
            imageTypes={ACCEPTED_IMAGE_TYPES}
          />
          <AttachEmoji appendEmoji={appendEmoji} />
          <button type="button" className=" btn btn-circle btn-ghost btn-sm">
            <StatsIcon />
          </button>
          <button type="button" className=" btn btn-circle btn-ghost btn-sm">
            <GifIcon />
          </button>
          <button type="button" className=" btn btn-circle btn-ghost btn-sm">
            <ScheduleIcon />
          </button>
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-sm ${isFormInvalid && 'btn-disabled !bg-base-200'} `}
        >
          <p>Post</p>
          {postIsPending && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </button>
      </div>
    </div>
  )
}
