import { useNavigateBackwards } from '@/src/hooks/useNavigateBackwards'
import ArrowIconSvg from './icons/ArrowIconSvg'

export const BackBtn = () => {
  const navBack = useNavigateBackwards()

  return (
    <div data-tip="Back" className="tooltip tooltip-bottom tooltip-secondary">
      <button
        onClick={navBack}
        className="btn btn-circle btn-ghost text-secondary"
      >
        <ArrowIconSvg width={18} height={18} fill="currentColor" />
      </button>
    </div>
  )
}
