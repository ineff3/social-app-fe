import { BlockContainer } from '../BlockContainer'
import { SuggestionList } from './SuggestionList'

export const FollowSuggestions = () => {
  return (
    <BlockContainer>
      <div className="flex flex-col gap-7">
        <p className=" px-4 text-lg font-bold text-secondary">You might like</p>
        <SuggestionList />
      </div>
    </BlockContainer>
  )
}
