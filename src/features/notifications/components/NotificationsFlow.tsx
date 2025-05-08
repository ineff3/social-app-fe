import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  resetIncomingNotifications,
  selectIncNotificationsCount,
} from '@/src/redux/notification/notificationSlice'
import { GetAllNotificationsParams } from '@/src/utils/api/interfaces'
import { useInView } from 'react-intersection-observer'
import { useGetNotifications } from '../hooks/useGetNotifications'
import { useEffect } from 'react'
import { NotificationRow } from './NotificationRow'
import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { isEmptyPaginatedResult } from '@/src/common/checkers/isEmptyPaginatedResult'
import { NoContentScreen } from '@/src/components/ui/NoContentScreen'

interface Props {
  notificationsParams: GetAllNotificationsParams
}

export const NotificationsFlow = ({ notificationsParams }: Props) => {
  const incNotificationsCount = useAppSelector(selectIncNotificationsCount)
  const dispatch = useAppDispatch()
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, refetch, isLoading, isError } =
    useGetNotifications(
      {
        limit: 20,
        order: 'desc',
      },
      notificationsParams,
    )

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

  if (isError) {
    return (
      <div className="mx-10 mt-5">
        <ErrorAlert errorMessage="Unable to display notifications" />
      </div>
    )
  }
  if (!isLoading && data && isEmptyPaginatedResult(data)) {
    return (
      <NoContentScreen
        title="You're all caught up!"
        content="Nothing new to see here. We'll let you know when something arrives."
        className="mt-10"
      />
    )
  }

  return (
    <div className="flex flex-col" role="feed">
      {data &&
        data.pages
          .flatMap((page) => page.data)
          .map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
            />
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
