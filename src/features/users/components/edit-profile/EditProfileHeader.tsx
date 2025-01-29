import { ComponentWithCloseProps } from '@/src/common/props'
import { CloseCircleButton } from '@/src/components/ui/buttons/CloseCircleButton'
import { StickyHeader } from '@/src/components/ui/StickyHeader'

interface Props extends ComponentWithCloseProps {
  scrollElementRef: React.RefObject<HTMLElement>
  isDisabled: boolean
}

export const EditProfileHeader = ({
  scrollElementRef,
  onClose,
  isDisabled,
}: Props) => {
  return (
    <StickyHeader
      className="border-none bg-base-300"
      scrolledElementRef={scrollElementRef}
    >
      <div className="flex items-center gap-4 px-5 py-3">
        <CloseCircleButton onClick={onClose} />
        <div className="flex flex-1 items-center justify-between">
          <p className="font-bold text-secondary">Edit Profile</p>
          <button
            className={`btn btn-primary btn-sm ${isDisabled && 'btn-disabled'}`}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </StickyHeader>
  )
}
