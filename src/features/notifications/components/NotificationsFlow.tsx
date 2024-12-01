import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useGetNotifications } from '../hooks/useGetNotifications'
import { NotificationRow } from './NotificationRow'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  resetIncomingNotifications,
  selectIncNotificationsCount,
} from '@/src/redux/notification/notificationSlice'

export const NotificationsFlow = () => {
  const incNotificationsCount = useAppSelector(selectIncNotificationsCount)
  const dispatch = useAppDispatch()
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, refetch } = useGetNotifications({
    limit: 20,
    order: 'desc',
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  useEffect(() => {
    if (incNotificationsCount !== 0) {
      refetch()
      dispatch(resetIncomingNotifications())
    }
  }, [incNotificationsCount, refetch, dispatch])

  return (
    <div className="flex flex-col" role="feed">
      {data &&
        data.pages.map((page) => (
          <div key={page.page}>
            {page.data.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
              />
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
