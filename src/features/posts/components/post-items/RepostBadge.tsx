import RepostIconSvg from '@/src/components/ui/icons/RepostIconSvg'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'
import { Link } from 'react-router-dom'

interface Props {
  repostAuthor: SchemaUserPreviewResponseDto
}

export const RepostBadge = ({ repostAuthor }: Props) => {
  return (
    <div className=" absolute -top-[20px] left-[35px] flex items-center gap-2">
      <RepostIconSvg width={14} height={14} fill="currentColor" />
      <Link
        to={`/users/${repostAuthor.username}`}
        className="link-hover link text-sm"
      >
        {repostAuthor.firstName} {repostAuthor.secondName}
      </Link>
    </div>
  )
}
