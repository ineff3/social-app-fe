import { SchemaNotificationResponseDto } from '@/src/generated/schema'
import { NotificationMessage } from './NotificationMessage'
import { useViewNotification } from '../hooks/useViewNotification'
import Post from '../../posts/components/Post'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'

interface Props {
  notification: SchemaNotificationResponseDto
}

export const NotificationRow = ({ notification }: Props) => {
  const viewNotificationMutation = useViewNotification(notification.id)
  const queryKeyStore = useQueryKeyStore()
  const { isViewed } = notification
  return (
    <div
      onClick={() => viewNotificationMutation.mutate({})}
      className={`relative ${!isViewed && 'bg-base-200 bg-opacity-45 hover:bg-opacity-20'} `}
    >
      {notification?.mentionedPost ? (
        <Post
          post={notification.mentionedPost}
          qKey={queryKeyStore.posts.all({})._ctx.notifications._def}
        />
      ) : (
        <NotificationMessage notification={notification} />
      )}
      {!isViewed && (
        <div className=" absolute left-1 top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-primary md:left-2.5" />
      )}
    </div>
  )
}
