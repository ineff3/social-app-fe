import XIconSvg from '@/src/components/ui/icons/XIconSvg'
import { SchemaNotificationResponseDto } from '@/src/generated/schema'

interface Props {
  notification: SchemaNotificationResponseDto
}

export const NotificationMessage = ({ notification }: Props) => {
  return (
    <article tabIndex={0} className=" border-b border-accent p-5 md:p-10">
      <div className=" flex items-center gap-6">
        <span className="text-secondary">
          <XIconSvg width={33} height={33} fill="currentcolor" />
        </span>

        <div className=" flex flex-1 flex-col gap-5">
          <div className=" flex flex-col gap-2">
            {notification?.message && (
              <p className=" text-secondary">{notification?.message}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
