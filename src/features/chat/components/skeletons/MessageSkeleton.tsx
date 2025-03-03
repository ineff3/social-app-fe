import clsx from 'clsx'

const placement = {
  start: 'chat-start',
  end: 'chat-end',
}

interface Props {
  position: keyof typeof placement
  width: number
  height: number
}

export const MessageSkeleton = ({ position, width, height }: Props) => {
  return (
    <div className={clsx('chat', placement[position])}>
      <div
        className="chat-bubble skeleton w-full"
        style={{ maxWidth: width, height }}
      ></div>
    </div>
  )
}
