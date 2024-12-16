/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { useDebounce } from '@/src/hooks/useDebounce'
import { UserPreview } from '@/src/layouts/components/UserPreview'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { SuggestionProps } from '@tiptap/suggestion'
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md'

export const MentionSelectList = forwardRef(
  ({ command, query }: SuggestionProps<string>, ref: ForwardedRef<any>) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [searchQuery] = useDebounce(query, 500)
    const queryKeyStore = useQueryKeyStore()
    const { data: { data: users } = {}, isError } = useQuery({
      ...queryKeyStore.users.search(searchQuery, 5),
      placeholderData: keepPreviousData,
    })

    const selectItem = (index: number) => {
      if (!users) {
        return
      }
      const item = users[index]

      if (item) {
        command({ id: item, label: item.username })
      }
    }

    const upHandler = () => {
      if (!users) {
        return
      }
      setSelectedIndex((selectedIndex + users.length - 1) % users.length)
    }

    const downHandler = () => {
      if (!users) {
        return
      }
      setSelectedIndex((selectedIndex + 1) % users.length)
    }

    const enterHandler = () => {
      selectItem(selectedIndex)
    }

    useEffect(() => setSelectedIndex(0), [users])

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === 'ArrowUp') {
          upHandler()
          return true
        }

        if (event.key === 'ArrowDown') {
          downHandler()
          return true
        }

        if (event.key === 'Enter') {
          enterHandler()
          return true
        }

        return false
      },
    }))

    return (
      <ul className="flex h-full max-h-[400px] w-[300px] flex-col overflow-y-auto rounded-lg bg-base-100 shadow-[0px_0px_20px_-8px_rgba(255,255,255,1);]">
        {isError && (
          <div className=" p-5">
            <ErrorAlert errorMessage="Something went wrong. Please try again later." />
          </div>
        )}
        {users &&
          (users.length === 0 ? (
            <div className="flex h-[80px] items-center justify-center gap-2 text-lg">
              <MdOutlineErrorOutline size={25} />
              <span>No results</span>
            </div>
          ) : (
            users.map((user, index) => (
              <li
                className={` hover:neutral-content flex items-center px-5 py-3 hover:bg-base-300 ${selectedIndex === index && 'bg-base-300 opacity-90 '}`}
                aria-label={`Select ${user.firstName} ${user.secondName}`}
                role="button"
                onClick={() => selectItem(index)}
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
  },
)
