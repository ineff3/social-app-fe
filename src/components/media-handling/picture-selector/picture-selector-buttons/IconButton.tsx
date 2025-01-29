import AddImageIconSvg from '@/src/components/ui/icons/AddImageIconSvg'
import { RenderButtonProps } from '../PictureSelector'

export const IconButton = ({ onClick, disabled }: RenderButtonProps) => {
  return (
    <button
      type="button"
      className={`rounded-full bg-accent bg-opacity-60 p-1 text-secondary duration-200 hover:bg-opacity-90 ${disabled && 'btn-disabled'} `}
      onClick={onClick}
    >
      <AddImageIconSvg width={28} height={28} fill="currentColor" />
    </button>
  )
}
