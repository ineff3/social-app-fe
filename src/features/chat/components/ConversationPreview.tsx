interface Props {
  show: () => void
}

export const ConversationPreview = ({ show }: Props) => {
  return (
    <div className=" m-auto flex h-full w-full max-w-[340px] items-center justify-center">
      <div className=" flex flex-col gap-5">
        <p className=" text-3xl font-bold text-secondary">
          Select a conversation
        </p>
        <p>Choose from your existing conversations or start a new one </p>
        <button className=" btn btn-circle btn-primary btn-wide" onClick={show}>
          New Conversation
        </button>
      </div>
    </div>
  )
}
