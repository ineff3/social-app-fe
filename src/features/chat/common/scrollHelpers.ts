export const isScrolledToBottom = (element: HTMLElement) => {
  return element.scrollTop + element.clientHeight >= element.scrollHeight
}

export const scrollToBottom = (element: HTMLElement) => {
  element.scrollTo(0, element.scrollHeight)
}
