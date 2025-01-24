import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { usePostContext } from '../../contexts/PostContext'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGES_PER_POST,
} from '../../schemas/createPostSchema'
import { GifIcon, ScheduleIcon, StatsIcon } from '@/src/components/ui/icons'
import { EmojiPopover } from '@/src/components/emoji/EmojiPopover'
import { Spinner } from '@/src/components/ui/spinners/Spinner'
import { PictureSelector } from '@/src/components/picture-composer/PictureSelector'

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
    addEmojiToText,
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
          <PictureSelector
            disabled={postImages.length >= MAX_IMAGES_PER_POST}
            acceptedPictureFormats={ACCEPTED_IMAGE_TYPES}
            onPictureAttach={(file) => appendPostImage({ file })}
          />
          <EmojiPopover
            onSelect={addEmojiToText}
            anchor={{ gap: 5, to: 'bottom end' }}
          />
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
          {isCreationPending && <Spinner size="sm" />}
        </button>
      </div>
    </div>
  )
}
