import { useRef } from 'react'
import { ImageIcon } from '../ui/icons'

interface Props {
  disabled: boolean
  acceptedPictureFormats: string[]
  onPictureAttach: (files: File) => void
}

export const PictureSelector = ({
  disabled,
  acceptedPictureFormats,
  onPictureAttach,
}: Props) => {
  const pictureInputRef = useRef<HTMLInputElement | null>(null)

  const handleOpenClick = () => {
    pictureInputRef?.current?.click()
  }

  const handleAddPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    onPictureAttach(file)

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
