import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { UserPreview } from '@/src/layouts/components/UserPreview'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { MdOutlineErrorOutline } from 'react-icons/md'

interface Props {
  searchQuery: string
  onClick: (user: SchemaUserPreviewResponseDto) => void
  resultLength: number
  isBordered?: boolean
}

const ROW_HEIGHT = 70

export const SearchList = ({
  searchQuery,
  onClick,
  resultLength,
  isBordered = false,
}: Props) => {
  const queryKeyStore = useQueryKeyStore()
  const { data, isError } = useQuery({
    ...queryKeyStore.users.search(searchQuery, resultLength),
    placeholderData: keepPreviousData,
  })

  return (
    <ul
      className={`flex max-h-[400px] w-full flex-col overflow-y-auto rounded-lg bg-base-100 ${isBordered ? 'border border-accent' : 'shadow-[0px_0px_20px_-8px_rgba(255,255,255,1);]'}`}
    >
      {isError && (
        <div className=" p-5">
          <ErrorAlert errorMessage="Something went wrong. Please try again later." />
        </div>
      )}
      {data &&
        (data.data.length === 0 ? (
          <div
            className="flex items-center justify-center gap-2"
            style={{ height: `${ROW_HEIGHT}px` }}
          >
            <MdOutlineErrorOutline size={25} />
            <span className="font-medium">No results</span>
          </div>
        ) : (
          data.data.map((user) => (
            <li
              className=" hover:neutral-content flex items-center px-5 py-3 hover:bg-base-300 "
              style={{ height: `${ROW_HEIGHT}px` }}
              aria-label={`Select ${user.firstName} ${user.secondName}`}
              onClick={() => onClick(user)}
              key={user.id}
            >
              <UserPreview
                user={user}
                disabledLink={true}
                isResponsive={false}
              />
            </li>
          ))
        ))}
    </ul>
  )
}
