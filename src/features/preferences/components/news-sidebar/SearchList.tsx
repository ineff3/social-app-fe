import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { UserPreview } from '@/src/layouts/components/UserPreview'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { UserSelectionHandler } from '../../interfaces'
import { useKeyboardListNavigation } from '../../hooks/useKeyboardListNavigation'
import { NotFoundScreen } from '@/src/components/ui/NotFoundScreen'

interface Props {
  searchQuery: string
  onClick: UserSelectionHandler
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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const queryKeyStore = useQueryKeyStore()
  const { data, isError } = useQuery({
    ...queryKeyStore.users.search(searchQuery, resultLength),
    placeholderData: keepPreviousData,
  })

  useKeyboardListNavigation(
    selectedIndex,
    setSelectedIndex,
    onClick,
    data?.data,
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  return (
    <ul
      className={clsx(
        'flex max-h-[400px] w-full flex-col overflow-y-auto rounded-lg bg-base-100',
        isBordered
          ? 'border border-accent'
          : 'shadow-[0px_1px_11px_-5px_rgba(255,255,255,1)]',
      )}
    >
      {isError && (
        <div className=" p-5">
          <ErrorAlert errorMessage="Something went wrong. Please try again later." />
        </div>
      )}
      {data &&
        (data.data.length === 0 ? (
          <NotFoundScreen
            title="No results found"
            content="Try adjusting your keywords or check for typos."
            className="p-5"
            size="sm"
          />
        ) : (
          data.data.map((user, index) => (
            <li
              className={clsx(
                'flex items-center px-5 py-3 text-start hover:bg-base-300',
                selectedIndex === index && 'bg-base-300',
              )}
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
