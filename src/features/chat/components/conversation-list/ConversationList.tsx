import { useEffect } from 'react'
import { useGetConversations } from '../../hooks/useGetConversations'
import { useInView } from 'react-intersection-observer'
import { ConversationRow } from './ConversationRow'

export const ConversationList = () => {
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetConversations({
    limit: 10,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className=" loading-spinner loading-md" />
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      {data &&
        data.pages.map((page) => (
          <div key={page.page}>
            {page.data.map((conv) => (
              <ConversationRow conv={conv} key={conv.id} />
            ))}
          </div>
        ))}
      {hasNextPage && (
        <span
          ref={ref}
          className="loading loading-spinner loading-lg my-4 self-center"
        ></span>
      )}
    </div>
  )
}
