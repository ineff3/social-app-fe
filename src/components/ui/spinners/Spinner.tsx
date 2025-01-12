const sizes = {
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
}

interface Props {
  size?: keyof typeof sizes
}

export const Spinner = ({ size = 'md' }: Props) => {
  return <span className={`loading loading-spinner ${sizes[size]}`}></span>
}
