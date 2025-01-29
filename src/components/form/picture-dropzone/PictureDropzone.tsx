import { useDropzone } from 'react-dropzone'
import { PictureSelector } from '../../media-handling/picture-selector/PictureSelector'
import { IconButton } from '../../media-handling/picture-selector/picture-selector-buttons/IconButton'
import {
  PictureUploadProps,
  useHandlePictureUpload,
} from '@/src/hooks/media/useHandlePictureUpload'

export const PictureDropzone = <
  TFile extends { file: File; imageKey?: string },
>({
  value,
  pictureUrl,
  placeholderContent,
  ...rest
}: {
  value: TFile | null
  pictureUrl?: string | null
  placeholderContent?: React.ReactNode
} & PictureUploadProps) => {
  const handlePictureUpload = useHandlePictureUpload(rest)
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    noClick: true,
    accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.webp'] },
    onDrop: (files) => {
      if (files.length === 0) {
        return
      }
      handlePictureUpload(files[0], 'avatar')
    },
  })

  const hasContent = value || pictureUrl

  return (
    <div {...getRootProps()} className=" !relative h-full w-full">
      <input {...getInputProps()} />

      {hasContent ? (
        <img
          src={value ? URL.createObjectURL(value.file) : pictureUrl ?? ''}
          className="h-full w-full object-cover"
        />
      ) : (
        placeholderContent
      )}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PictureSelector
          acceptedPictureFormats={[]}
          renderButton={({ onClick, disabled }) => (
            <IconButton onClick={onClick} disabled={disabled} />
          )}
          {...rest}
          disabled={false} // hardcoded
          pictureUploadType="avatar"
        />
      </div>
    </div>
  )
}
