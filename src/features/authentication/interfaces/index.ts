export interface ISignupData {
  firstName: string
  secondName: string
  email: string
  password: string
  confirmPassword: string
}
export interface ILoginData {
  email: string
  password: string
}
export interface IUser {
  _id: string
  firstName: string
  secondName: string
  bio: string
  location: string
  link: string
  email: string
  username: string
  userImage: string
  userImageUrl: string
  bornDate: string
  createdAt: string
  backgroundImage: string
  backgroundImageUrl: string
}
