import { SchemaPostResponseDto } from '@/src/types/schema'
import { convertPostDate } from '../../../utils/dateConversions'
import { ImageDisplay } from '../../post-items/ImageDisplay'
import { convertPostTextToHTML } from '../../../utils/convertPostTextToHTML'
import UserIconLink from '@/src/components/ui/UserIconLink'

interface Props {
  post: SchemaPostResponseDto
}

export const Repost = ({
  post: { author, createdAt, text, imageUrls },
}: Props) => {
  const createdDate = new Date(createdAt)
  return (
    <article className="pointer-events-none rounded-lg border border-accent bg-base-100 p-4">
      <div className=" flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm">
          <UserIconLink
            userImageUrl={author?.avatarUrl}
            username={author?.username}
            iconSize="sm"
          />
          <span className=" font-medium text-secondary">
            {author?.firstName} {author?.secondName}
          </span>
          <span className=" hidden sm:block">@{author?.username}</span>
          <span>·</span>
          <time dateTime={createdDate.toISOString()}>
            {convertPostDate(createdDate)}
          </time>
        </div>

        {text && (
          <p
            className=" text-secondary"
            dangerouslySetInnerHTML={{
              __html: convertPostTextToHTML(text),
            }}
          />
        )}

        {imageUrls && imageUrls.length > 0 && (
          <ImageDisplay imageUrls={imageUrls} />
        )}
      </div>
    </article>
  )
}
