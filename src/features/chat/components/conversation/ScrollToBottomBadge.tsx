import { useEffect, useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { isScrolledToBottom } from '../../common/scrollHelpers'
import { useHandleScrollToBottom } from '../../hooks/useHandleScrollToBottom'
import { TriggerScrollToBottom } from '../../hooks/useTriggerScrollToBottom'
import { SchemaConversationResponseDto } from '@/src/types/schema'

interface Props {
  scrollElementRef: React.RefObject<HTMLElement>
  conversation: SchemaConversationResponseDto
  triggerScrollToBottom: TriggerScrollToBottom
}

export const ScrollToBottomBadge = ({
  scrollElementRef,
  conversation,
  triggerScrollToBottom,
}: Props) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(true)
  const [buttonPosition, setButtonPosition] = useState({
    right: 0,
    bottom: 0,
  })

  const handleScroll = useHandleScrollToBottom(
    scrollElementRef,
    conversation.id,
    triggerScrollToBottom,
  )

  useEffect(() => {
    const element = scrollElementRef.current

    if (!element) return

    const handleScroll = () => {
      const scrolledToBottom = isScrolledToBottom(element)
      setScrolledToBottom(scrolledToBottom)
    }

    element.addEventListener('scroll', handleScroll)

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [scrollElementRef])

  useEffect(() => {
    const updateButtonPosition = () => {
      if (scrollElementRef.current) {
        const rect = scrollElementRef.current.getBoundingClientRect()
        setButtonPosition({
          right: window.innerWidth - rect.right + 35,
          bottom: window.innerHeight - rect.bottom + 20,
        })
      }
    }

    updateButtonPosition()

    window.addEventListener('resize', updateButtonPosition)
    return () => window.removeEventListener('resize', updateButtonPosition)
  }, [scrollElementRef])

  return (
    <div
      className="fixed"
      style={{
        right: buttonPosition.right,
        bottom: buttonPosition.bottom,
      }}
    >
      <button
        onClick={handleScroll}
        className={`relative flex items-center justify-center rounded-full border border-base-content bg-base-100 p-2.5 transition-opacity duration-300 ${scrolledToBottom ? 'opacity-0' : 'opacity-100'}`}
      >
        <SlArrowDown width={30} height={30} className="fill-base-content" />
        {conversation.unreadAmount !== 0 && (
          <div className=" badge badge-secondary badge-sm absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 self-center">
            {conversation.unreadAmount}
          </div>
        )}
      </button>
    </div>
  )
}
