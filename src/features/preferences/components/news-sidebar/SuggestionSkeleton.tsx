export const SuggestionSkeleton = () => {
  return (
    <div className=" flex items-center justify-between px-4 py-3">
      <div className="flex gap-2">
        <div className="skeleton h-[45px] w-[45px] rounded-full" />
        <div className="flex flex-col gap-3">
          <div className=" skeleton h-[22px] w-[80px]" />
          <div className=" skeleton h-[16px] w-[120px]" />
        </div>
      </div>
      <div className=" skeleton h-[32px] w-[73px]"></div>
    </div>
  )
}
