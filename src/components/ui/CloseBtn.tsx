interface Props {
  onClick: () => void
}

export const CloseBtn = ({ onClick }: Props) => {
  return (
    <div data-tip="Close" className=" tooltip tooltip-secondary">
      <button
        aria-label="Close"
        type="button"
        onClick={onClick}
        className="btn btn-circle btn-ghost text-base "
      >
        ✕
      </button>
    </div>
  )
}
