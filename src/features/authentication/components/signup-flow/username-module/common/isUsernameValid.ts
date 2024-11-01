export const isUsernameValid = (username: string | undefined) => {
  return username && username.length > 4
}
