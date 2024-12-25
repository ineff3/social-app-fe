import { format, isToday } from 'date-fns'

const monthMap: { [key: number]: string } = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}

export const convertPostDate = (date: Date) => {
  const currentDate = new Date()
  if (currentDate.getDate() === date.getDate()) {
    if (currentDate.getHours() === date.getHours()) {
      return currentDate.getMinutes() - date.getMinutes() + 'm ago'
    }
    return currentDate.getHours() - date.getHours() + 'h ago'
  } else {
    return monthMap[date.getMonth()] + ' ' + date.getDate()
  }
}

export const convertToFullFate = (date: Date) => {
  return [format(date, 'H:mm 	a'), format(date, 'MMM d, yyyy')]
}

export function formatMessageDate(date: Date): string {
  return format(date, 'HH:mm')
}

export function formatDateForToday(date: Date) {
  if (isToday(date)) {
    return 'Today'
  }
  return format(date, 'd MMMM')
}
