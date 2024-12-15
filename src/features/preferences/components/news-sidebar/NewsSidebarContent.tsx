import { FollowSuggestions } from './FollowSuggestions'
import { SearchBar } from './SearchBar'

export const NewsSidebarContent = () => {
  return (
    <div className="flex flex-col gap-5 py-2">
      <SearchBar />
      <FollowSuggestions />
    </div>
  )
}
