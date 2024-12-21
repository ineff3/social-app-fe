export const ConversationPreview = () => {
  return (
    <div className=" m-auto flex h-full w-full max-w-[340px] items-center justify-center">
      <div className=" flex flex-col gap-5">
        <p className=" text-3xl font-bold text-secondary">Select a message</p>
        <p>
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </p>
        <button className=" btn btn-circle btn-primary btn-wide">
          New message
        </button>
      </div>
    </div>
  )
}
