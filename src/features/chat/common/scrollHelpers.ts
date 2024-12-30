export const isScrolledToBottom = (element: HTMLElement) => {
  return element.scrollHeight - element.scrollTop === element.clientHeight
}

export const scrollToBottom = (element: HTMLElement) => {
  element.scrollTo(0, element.scrollHeight)
}
