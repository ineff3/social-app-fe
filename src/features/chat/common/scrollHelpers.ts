export const isScrolledToBottom = (element: HTMLElement) => {
  return (
    Math.round(element.scrollHeight - element.scrollTop) ===
    element.clientHeight
  )
}

export const scrollToBottom = (
  element: HTMLElement,
  behavior: ScrollBehavior,
) => {
  element.scrollTo({ left: 0, top: element.scrollHeight, behavior })
}
