import { useEffect, useState } from 'react'

export const useDebounce = <T>(observedField: T, time: number) => {
  const [field, setField] = useState<T>(observedField)
  const [isDebounceLoading, setIsDebounceLoading] = useState(false)

  useEffect(() => {
    setIsDebounceLoading(true)
    const timeout = setTimeout(() => {
      setField(observedField)
      setIsDebounceLoading(false)
    }, time)

    return () => {
      clearTimeout(timeout)
      setIsDebounceLoading(false)
    }
  }, [observedField, time, setField])

  return [field, isDebounceLoading] as const
}
