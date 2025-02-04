import { useRef } from 'react'
import { CloseCircleButton } from '../../ui/buttons/CloseCircleButton'
import { useClickOutside } from '@/src/hooks/useClickOutside'

interface Props {
  imageUrl: string
  isVisible: boolean
  onClose: () => void
}

export const PictureFullscreenDisplay = ({
  imageUrl,
  isVisible,
  onClose,
}: Props) => {
  const imageRef = useRef<HTMLImageElement | null>(null)

  useClickOutside(imageRef, onClose)

  if (!isVisible) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 z-[12] flex justify-center">
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Message Image"
          className="object-contain"
        />
        <div className="fixed left-5 top-5 z-[13]">
          <CloseCircleButton
            onClick={onClose}
            isGhost={false}
            className="text-secondary"
          />
        </div>
      </div>
      <div className="fixed inset-0 z-[11] bg-black/50" />
    </>
  )
}
