import { useRef, useState } from 'react'
import { useSearchShortcut } from '../../hooks/useSearchShortcut'
import { SearchList } from './SearchList'
import { useClickOutside } from '@/src/hooks/useClickOutside'
import { useDebounce } from '@/src/hooks/useDebounce'
import { useNavigate } from 'react-router-dom'
import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'

export const SearchBar = () => {
  const [isListOpen, setIsListOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const onUserRowSelect = (user: SchemaUserPreviewResponseDto) => {
    navigate(`users/${user.username}`)
    setIsListOpen(false)
  }

  useSearchShortcut(inputRef)
  useClickOutside(dropdownRef, () => {
    setIsListOpen(false)
  })

  return (
    <div ref={dropdownRef} className=" relative">
      <label className="input input-bordered flex items-center gap-2">
        <input
          onFocus={() => setIsListOpen(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={inputRef}
          type="text"
          className="grow"
          placeholder="Search"
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>

      {isListOpen && (
        <div className=" absolute right-0 top-full mt-2 w-full">
          <SearchList
            searchQuery={debouncedSearchQuery}
            onClick={onUserRowSelect}
            resultLength={5}
          />
        </div>
      )}
    </div>
  )
}
