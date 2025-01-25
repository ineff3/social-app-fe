import { useRef } from 'react'
import { ImageIcon } from '../ui/icons'
import { useUploadImage } from '@/src/hooks/media/useUploadImage'
import { SchemaUploadImageResponseDto } from '@/src/generated/schema'

interface Props {
  disabled: boolean
  acceptedPictureFormats: string[]
  onPictureAttach: (files: File, key: string) => void
  onPictureUpload: (response: SchemaUploadImageResponseDto, key: string) => void
  setIsImageUploading: React.Dispatch<React.SetStateAction<boolean>>
}

export const PictureSelector = ({
  disabled,
  acceptedPictureFormats,
  onPictureAttach,
  onPictureUpload,
  setIsImageUploading,
}: Props) => {
  const pictureInputRef = useRef<HTMLInputElement | null>(null)
  const uploadImageMutation = useUploadImage()

  const handleOpenClick = () => {
    pictureInputRef?.current?.click()
  }

  const handleAddPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('image', file)
    formData.append('imageType', 'post')

    const key = crypto.randomUUID()

    uploadImageMutation.mutate(formData, {
      onSuccess: (response) => {
        onPictureUpload(response, key)
      },
      onSettled: () => {
        setIsImageUploading(false)
      },
    })

    setIsImageUploading(true)
    onPictureAttach(file, key)

    if (pictureInputRef.current) {
      pictureInputRef.current.value = ''
    }
  }

  return (
    <>
      <div data-tip="Media" className=" tooltip tooltip-secondary">
        <button
          onClick={handleOpenClick}
          type="button"
          className={` btn btn-circle btn-ghost btn-sm ${disabled && 'btn-disabled !bg-base-200'}`}
        >
          <ImageIcon />
        </button>
      </div>

      <input
        disabled={disabled}
        type="file"
        accept={acceptedPictureFormats.join(', ')}
        className=" hidden"
        onChange={handleAddPicture}
        ref={pictureInputRef}
      />
    </>
  )
}
