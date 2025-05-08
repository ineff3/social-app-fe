import clsx from 'clsx'
import { LoopIcon } from './icons/LoopIcon'

interface Props {
  title: string
  content: string
  className?: string
}

export const NoContentScreen = ({ title, content, className }: Props) => {
  return (
    <div className={clsx('flex justify-center', className)}>
      <div className={clsx('flex max-w-[320px] flex-col items-center gap-4')}>
        <div className="text-center ">
          <p className="text-lg text-secondary">{title}</p>
          <p className=" mt-1 text-sm">{content}</p>
        </div>
        <LoopIcon width={80} height={80} fill="currentColor" />
      </div>
    </div>
  )
}
