import { BlockContainer } from '../BlockContainer'
import { FollowSuggestions } from './FollowSuggestions'

export const NewsSidebarContent = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>SearchBar</div>
      <BlockContainer>Hi there</BlockContainer>
      <FollowSuggestions />
    </div>
  )
}
