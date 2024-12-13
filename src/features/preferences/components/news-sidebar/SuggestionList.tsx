import { useGetSuggestions } from '../../hooks/useGetSuggestions'
import { SuggestionRow } from './SuggestionRow'

export const SuggestionList = () => {
  const { data, isLoading, isError } = useGetSuggestions({ limit: 3 })

  if (isLoading) {
    return <></>
  }

  if (isError) {
    return <></>
  }

  return (
    <div className="flex flex-col">
      {data &&
        data.pages[0].data.map((suggestion) => (
          <SuggestionRow key={suggestion.id} userPreview={suggestion} />
        ))}
    </div>
  )
}
