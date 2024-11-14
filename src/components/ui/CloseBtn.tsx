interface Props {
  onClick: () => void
}

export const CloseBtn = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-circle btn-ghost text-base "
    >
      ✕
    </button>
  )
}
