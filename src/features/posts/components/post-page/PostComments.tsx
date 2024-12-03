import { useGetPostComments } from '../../hooks/useGetPostComments'

interface Props {
  postId: string
}

export const PostComments = ({ postId }: Props) => {
  const { data, isLoading, isError } = useGetPostComments(postId)

  return <div>PostComments</div>
}
