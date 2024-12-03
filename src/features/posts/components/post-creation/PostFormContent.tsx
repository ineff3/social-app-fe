import UserIconLink from '@/src/components/ui/UserIconLink'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { usePostContext } from '../../contexts/PostContext'
import { AttachedPictures } from './additional-content/AttachedPictures'
import { TextEditor } from './post-form/TextEditor'
import { Controller } from 'react-hook-form'

export const PostFormContent = () => {
  const user = useAppSelector(selectUserPreview)
  const {
    control,
    formState: { errors },
    postImages,
    removePostImage,
  } = usePostContext()!

  return (
    <div className="flex flex-1 gap-2 px-1.5">
      <UserIconLink userImageUrl={user?.avatarUrl} username={user?.username} />
      <div className=" flex w-full flex-col gap-5">
        <label className=" form-control">
          <Controller
            control={control}
            name="text"
            render={({ field }) => (
              <TextEditor
                initialContent={field.value}
                onChange={field.onChange}
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
        <AttachedPictures
          attachedFiles={postImages}
          removeFile={removePostImage}
        />
      </div>
    </div>
  )
}
