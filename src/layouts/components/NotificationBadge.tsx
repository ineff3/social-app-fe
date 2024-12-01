import { useAppSelector } from '@/src/redux/hooks'
import { selectIncNotificationsCount } from '@/src/redux/notification/notificationSlice'

export const NotificationBadge = () => {
  const count = useAppSelector(selectIncNotificationsCount)
  if (count === 0) {
    return false
  }

  return (
    <div
      className={` badge badge-secondary badge-sm absolute ${count < 10 ? '-right-[60%]' : '-right-full'} -top-1/2`}
    >
      {count > 99 ? '99+' : count}
    </div>
  )
}
