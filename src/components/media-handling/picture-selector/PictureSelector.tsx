import { useRef } from 'react'
import {
  PictureUploadProps,
  useHandlePictureUpload,
} from '@/src/hooks/media/useHandlePictureUpload'
import { SchemaImageUploadDto } from '@/src/generated/schema'
import { ClickableComponentProps } from '@/src/common/props'

export interface RenderButtonProps extends ClickableComponentProps {
  disabled: boolean
}

interface Props extends PictureUploadProps {
  disabled: boolean
  acceptedPictureFormats: string[]
  pictureUploadType: SchemaImageUploadDto['imageType']
  renderButton: (props: RenderButtonProps) => React.ReactNode
}

export const PictureSelector = ({
  disabled,
  acceptedPictureFormats,
  pictureUploadType,
  renderButton,
  ...rest
}: Props) => {
  const pictureInputRef = useRef<HTMLInputElement | null>(null)
  const handlePictureUpload = useHandlePictureUpload(rest)

  const handleOpenClick = () => {
    pictureInputRef?.current?.click()
  }

  const handleAddPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    handlePictureUpload(file, pictureUploadType)

    if (pictureInputRef.current) {
      pictureInputRef.current.value = ''
    }
  }

  return (
    <>
      {renderButton({ onClick: handleOpenClick, disabled })}
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
