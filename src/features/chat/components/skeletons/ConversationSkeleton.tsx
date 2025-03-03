export const ConversationSkeleton = () => {
  return (
    <div className=" flex justify-between px-4 py-3">
      <div className="flex gap-2">
        <div className="skeleton h-[45px] w-[45px] rounded-full" />
        <div className="flex flex-col gap-3">
          <div className=" skeleton h-[22px] w-[100px]" />
          <div className=" skeleton h-[16px] w-[150px]" />
        </div>
      </div>
      <div className=" skeleton h-[15px] w-[40px]"></div>
    </div>
  )
}
