/* eslint-disable @typescript-eslint/no-explicit-any */
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQuery } from '@tanstack/react-query'
import { SuggestionProps } from '@tiptap/suggestion'
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

export const MentionSelectList = forwardRef(
  ({ command, query }: SuggestionProps<string>, ref: ForwardedRef<any>) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const queryKeyStore = useQueryKeyStore()
    const { data: { data: users } = {} } = useQuery({
      ...queryKeyStore.users.search(query, 5),
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
      <ul className="flex h-full max-h-[320px] w-[300px] flex-col overflow-y-auto rounded-lg bg-base-100 shadow-[0px_0px_20px_-8px_rgba(255,255,255,1);]">
        {users &&
          users.map((user, index) => (
            <li
              className={` hover:neutral-content flex items-center px-5 py-3 hover:bg-base-300 ${selectedIndex === index && 'bg-base-300 opacity-90 '}`}
              aria-label={`Select ${user.firstName} ${user.secondName}`}
              role="button"
              onClick={() => selectItem(index)}
              key={user.id}
            >
              {user.firstName}
            </li>
          ))}
      </ul>
    )
  },
)
