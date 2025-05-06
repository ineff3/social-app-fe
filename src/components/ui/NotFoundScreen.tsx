import clsx from 'clsx'
import { NotFoundIcon } from './icons/NotFoundIcon'

const sizes = {
  sm: {
    iconSize: 70,
    titleSize: 'text-md',
    contentSize: 'text-sm',
    maxWidth: 'max-w-[360px]',
  },
  md: {
    iconSize: 120,
    titleSize: 'text-lg',
    contentSize: 'text-sm',
    maxWidth: 'max-w-[360px]',
  },
  xl: {
    iconSize: 150,
    titleSize: 'text-xl',
    contentSize: 'text-md',
    maxWidth: 'max-w-[500px]',
  },
}

interface Props {
  title: string
  content: string
  className?: string
  size?: keyof typeof sizes
}

export const NotFoundScreen = ({
  title,
  content,
  className,
  size = 'md',
}: Props) => {
  const variant = sizes[size]
  return (
    <div className={clsx('flex w-full justify-center', className)}>
      <div className={clsx('flex items-center gap-5', variant.maxWidth)}>
        <NotFoundIcon
          width={variant.iconSize}
          height={variant.iconSize}
          className="fill-secondary"
        />
        <div className="flex flex-col">
          <p className={clsx('text-secondary', variant.titleSize)}>{title}</p>
          <p className={clsx(variant.contentSize)}>{content}</p>
        </div>
      </div>
    </div>
  )
}
