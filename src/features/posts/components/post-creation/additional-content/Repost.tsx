import { SchemaPostResponseDto } from '@/src/generated/schema'
import { convertPostDate } from '../../../utils/dateConversions'
import { ImageDisplay } from '../../post-items/ImageDisplay'
import { convertPostTextToHTML } from '../../../utils/convertPostTextToHTML'
import UserIconLink from '@/src/components/ui/UserIconLink'
import { useNavigate } from 'react-router-dom'

interface Props {
  post: SchemaPostResponseDto
  isInteractive?: boolean
}

export const Repost = ({
  post: { id, author, createdAt, text, postImages },
  isInteractive = false,
}: Props) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate(`/post/${id}`)
  }
  const createdDate = new Date(createdAt!)

  return (
    <article
      data-interactive={isInteractive}
      onClick={handleRedirect}
      className={` rounded-lg border border-accent bg-base-100 p-4 transition-colors duration-100 ease-in ${isInteractive ? ' hover:cursor-pointer hover:bg-base-300 hover:bg-opacity-70' : 'pointer-events-none'}`}
    >
      <div className=" flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm">
          <UserIconLink
            userImageUrl={author?.profileUrl}
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

        <ImageDisplay postImages={postImages} />
      </div>
    </article>
  )
}
