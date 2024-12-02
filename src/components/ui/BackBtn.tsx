import { useNavigateBackwards } from '@/src/hooks/useNavigateBackwards'
import ArrowIconSvg from './icons/ArrowIconSvg'

export const BackBtn = () => {
  const navBack = useNavigateBackwards()

  return (
    <button
      onClick={navBack}
      className="btn btn-circle btn-ghost text-secondary"
    >
      <ArrowIconSvg width={18} height={18} fill="currentColor" />
    </button>
  )
}
