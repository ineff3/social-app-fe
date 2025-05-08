export const USERNAME_MIN_LENGTH = 5
export const USERNAME_MAX_LENGTH = 15

export const isUsernameValid = (username: string | undefined): boolean => {
  return (
    !!username &&
    username.length >= 5 &&
    username.length <= 15 &&
    !username.includes(' ')
  )
}
