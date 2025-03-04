import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useGetNotifications } from '../hooks/useGetNotifications'
import { NotificationRow } from './NotificationRow'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  resetIncomingNotifications,
  selectIncNotificationsCount,
} from '@/src/redux/notification/notificationSlice'
import { Helmet } from 'react-helmet-async'

export const NotificationPage = () => {
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
    <>
      <Helmet>
        <title>Notifications | Linker</title>
        <meta
          name="description"
          content="Stay updated with your latest notifications on Linker."
        />
        <meta property="og:title" content="Notifications | Linker" />
        <meta
          property="og:description"
          content="Never miss an update—check your notifications now."
        />
      </Helmet>
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
    </>
  )
}
