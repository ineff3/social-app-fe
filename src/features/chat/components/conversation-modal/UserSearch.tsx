import { useState } from 'react'
import { useDebounce } from '@/src/hooks/useDebounce'
import { SearchList } from '@/src/features/preferences/components/news-sidebar/SearchList'
import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'

interface Props {
  onSearchResultClick: (user: SchemaUserPreviewResponseDto) => void
}

export const UserSearch = ({ onSearchResultClick }: Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  return (
    <div className="flex flex-col gap-4">
      <label className="input input-bordered flex items-center gap-2">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search people"
        />
      </label>
      <SearchList
        searchQuery={debouncedSearchQuery}
        onClick={onSearchResultClick}
        resultLength={5}
        isBordered={true}
      />
    </div>
  )
}
