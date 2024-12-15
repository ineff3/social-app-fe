import { Link } from 'react-router-dom'
import { BlockContainer } from '../BlockContainer'
import { SuggestionList } from './SuggestionList'

export const FollowSuggestions = () => {
  return (
    <BlockContainer>
      <div className="flex flex-col gap-7">
        <p className=" px-4 text-lg font-bold text-secondary">You might like</p>
        <SuggestionList />
        <Link to={''} className=" link-hover link link-primary px-4">
          Show more
        </Link>
      </div>
    </BlockContainer>
  )
}
