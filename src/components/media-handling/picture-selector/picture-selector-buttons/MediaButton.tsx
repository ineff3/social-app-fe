import { ImageIcon } from '@/src/components/ui/icons'
import { RenderButtonProps } from '../PictureSelector'

export const MediaButton = ({ onClick, disabled }: RenderButtonProps) => {
  return (
    <div data-tip="Media" className=" tooltip tooltip-secondary">
      <button
        onClick={onClick}
        type="button"
        className={` btn btn-circle btn-ghost btn-sm ${disabled && 'btn-disabled !bg-base-200'}`}
      >
        <ImageIcon />
      </button>
    </div>
  )
}
