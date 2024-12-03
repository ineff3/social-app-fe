import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { usePostContext } from '../../contexts/PostContext'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGES_PER_POST,
} from '../../schemas/createPostSchema'
import { GifIcon, ScheduleIcon, StatsIcon } from '@/src/components/ui/icons'
import { AttachEmoji } from './additional-content/AttachEmoji'
import { AttachPicture } from './additional-content/AttachPicture'

interface Props {
  hasDivider?: boolean
  submitBtnTitle?: string
  creationError: string | null
  isCreationPending: boolean
}

export const PostFormFooter = ({
  hasDivider = true,
  submitBtnTitle = 'Post',
  creationError,
  isCreationPending,
}: Props) => {
  const {
    postImages,
    appendPostImage,
    appendEmoji,
    formState: { errors, isDirty },
  } = usePostContext()!

  const isFormInvalid =
    errors?.postImages || errors?.text || !isDirty || isCreationPending

  return (
    <div>
      {creationError && <ErrorAlert errorMessage={creationError} />}
      {hasDivider && <div className=" divider"></div>}
      <div className=" flex  items-center justify-between">
        <div className=" flex items-center gap-1.5 ">
          <AttachPicture
            maxFilesAttached={postImages.length >= MAX_IMAGES_PER_POST}
            append={appendPostImage}
            imageTypes={ACCEPTED_IMAGE_TYPES}
          />
          <AttachEmoji appendEmoji={appendEmoji} />
          <div data-tip="Poll" className=" tooltip tooltip-secondary">
            <button type="button" className=" btn btn-circle btn-ghost btn-sm">
              <StatsIcon />
            </button>
          </div>
          <div data-tip="Gif" className=" tooltip tooltip-secondary">
            <button type="button" className=" btn btn-circle btn-ghost btn-sm">
              <GifIcon />
            </button>
          </div>
          <div data-tip="Schedule" className=" tooltip tooltip-secondary">
            <button type="button" className=" btn btn-circle btn-ghost btn-sm">
              <ScheduleIcon />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-sm ${isFormInvalid && 'btn-disabled !bg-base-200'} `}
        >
          <p>{submitBtnTitle}</p>
          {isCreationPending && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </button>
      </div>
    </div>
  )
}
