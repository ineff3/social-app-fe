interface Props {
  skeletonType?: 'text' | 'image'
}

export const PostSkeleton = ({ skeletonType = 'text' }: Props) => {
  return (
    <div className=" flex gap-3 border-b border-accent p-5 md:py-7">
      <div className="skeleton h-[45px] w-[45px] rounded-full" />

      <div className="flex w-full flex-col gap-8">
        <div className=" flex justify-between">
          <div className=" skeleton h-6 w-80" />
          <div className=" skeleton h-6 w-[40px]" />
        </div>
        <div className=" flex flex-col gap-3">
          {skeletonType === 'text' ? (
            <>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-[75%]"></div>
            </>
          ) : (
            <div className="skeleton h-[340px] w-full" />
          )}
        </div>
        <div className=" flex justify-between">
          <div className=" skeleton h-6 w-[65px]" />
          <div className=" skeleton h-6 w-[65px]" />
          <div className=" skeleton h-6 w-[65px]" />
          <div className=" skeleton h-6 w-[65px]" />
        </div>
      </div>
    </div>
  )
}
