import UserIconLink from '@/src/components/ui/UserIconLink'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { usePostContext } from '../../contexts/PostContext'
import { TextEditor } from './post-form/TextEditor'
import { Controller } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { PostCreationLocationState } from '../../interfaces'
import { Repost } from './additional-content/Repost'
import { AttachedRepost } from './additional-content/AttachedRepost'
import { AttachedPicturesCarousel } from '@/src/components/media-handling/picture-carousel/AttachedPicturesCarousel'

interface Props {
  isTextEditorMinimized?: boolean
  placeholder?: string
}

export const PostFormContent = ({
  placeholder,
  isTextEditorMinimized,
}: Props) => {
  const user = useAppSelector(selectUserPreview)
  const location = useLocation()
  const repost = (location.state as PostCreationLocationState)?.repost

  const {
    control,
    formState: { errors },
    postImages,
    removePostImage,
    getValues,
    isImageUploading,
  } = usePostContext()!

  const savedRepostId = getValues('repostedId')

  return (
    <div className="flex flex-1 gap-2 px-1.5">
      <UserIconLink userImageUrl={user?.profileUrl} username={user?.username} />
      <div className=" flex w-full flex-col gap-5">
        <label className=" form-control">
          <Controller
            control={control}
            name="text"
            render={({ field }) => (
              <TextEditor
                placeholder={placeholder}
                content={field.value}
                onChange={field.onChange}
                isMinimized={isTextEditorMinimized}
              />
            )}
          />
          <div className="label">
            {errors?.text && (
              <span className="label-text-alt text-error">
                {errors.text.message}
              </span>
            )}
          </div>
        </label>
        <AttachedPicturesCarousel
          pictures={postImages}
          onRemove={removePostImage}
          isImageUploading={isImageUploading}
        />
        {repost ? (
          <Repost post={repost} />
        ) : (
          savedRepostId && <AttachedRepost savedRepostId={savedRepostId} />
        )}
      </div>
    </div>
  )
}
