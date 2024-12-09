import { useGetPostDetail } from '../../../hooks/useGetPostDetail'
import { Repost } from './Repost'

interface Props {
  savedRepostId: string
}

export const AttachedRepost = ({ savedRepostId }: Props) => {
  const { data, isLoading, isError } = useGetPostDetail(savedRepostId)

  if (isLoading || isError) {
    return <></>
  }

  return data && <Repost post={data} />
}
