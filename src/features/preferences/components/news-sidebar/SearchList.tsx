import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { UserPreview } from '@/src/layouts/components/UserPreview'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const RESULTS_LENGTH = 5
interface Props {
  searchQuery: string
  closeDropdown: () => void
}

export const SearchList = ({ searchQuery, closeDropdown }: Props) => {
  const queryKeyStore = useQueryKeyStore()
  const navigate = useNavigate()
  const { data, isError } = useQuery({
    ...queryKeyStore.users.search(searchQuery, RESULTS_LENGTH),
    placeholderData: keepPreviousData,
  })

  return (
    <ul className="flex max-h-[400px] w-full flex-col overflow-y-auto rounded-lg bg-base-100 shadow-[0px_0px_20px_-8px_rgba(255,255,255,1);]">
      {isError && (
        <div className=" p-5">
          <ErrorAlert errorMessage="Something went wrong. Please try again later." />
        </div>
      )}
      {data &&
        (data.data.length === 0 ? (
          <div className="flex h-[80px] items-center justify-center gap-2 text-lg">
            <MdOutlineErrorOutline size={25} />
            <span>No results</span>
          </div>
        ) : (
          data.data.map((user) => (
            <li
              className=" hover:neutral-content flex items-center px-5 py-3 hover:bg-base-300 "
              aria-label={`Select ${user.firstName} ${user.secondName}`}
              onClick={() => {
                navigate(`users/${user.username}`)
                closeDropdown()
              }}
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
