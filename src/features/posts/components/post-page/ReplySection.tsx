import { PostProvider } from '../../contexts/PostContext'
import { PostFormContent } from '../post-creation/PostFormContent'
import { PostFormFooter } from '../post-creation/PostFormFooter'

export const ReplySection = () => {
  return (
    <PostProvider>
      <PostFormContent />
      <div className="pl-14">
        <PostFormFooter hasDivider={false} submitBtnTitle="Reply" />
      </div>
    </PostProvider>
  )
}
