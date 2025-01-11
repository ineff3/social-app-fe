import RepostIconSvg from '@/src/components/ui/icons/RepostIconSvg'
import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'
import { Link } from 'react-router-dom'

interface Props {
  repostAuthor: SchemaUserPreviewResponseDto
  disabled?: boolean
}

export const RepostBadge = ({ repostAuthor, disabled = false }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <RepostIconSvg width={14} height={14} fill="currentColor" />
      <Link
        to={`/users/${repostAuthor.username}`}
        className={`link-hover link text-sm ${disabled && 'pointer-events-none'}`}
      >
        {repostAuthor.firstName} {repostAuthor.secondName}
      </Link>
    </div>
  )
}
