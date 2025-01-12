import { Spinner } from '../ui/spinners/Spinner'

export const EmojiFallback = () => {
  return (
    <div className="flex h-[300px] w-[236px] items-center justify-center rounded-[24px] bg-base-100">
      <Spinner />
    </div>
  )
}
