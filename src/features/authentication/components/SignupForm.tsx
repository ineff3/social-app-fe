import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/src/redux/hooks'
import { setAccessToken } from '@/src/redux/user/userSlice'
import { PERSIST_AUTH_KEY } from '../constants'
import { SignupFormType, signupValidationSchema } from '../schemas'
import { pageRoutes } from '@/src/routes'
import Input from '@/src/components/form/Input'
import { useSignup } from '../hooks/useSignup'
import { Spinner } from '@/src/components/ui/spinners/Spinner'

interface Props {
  setErrorMessage: (value: string) => void
}
const SignupForm = ({ setErrorMessage }: Props) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signupMutation = useSignup()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit: SubmitHandler<SignupFormType> = (data) => {
    signupMutation.mutate(data, {
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 409) {
            setErrorMessage('User with such email already exists')
          } else if (err.response?.status === 400) {
            setErrorMessage(
              err.response.data?.message || 'Something went wrong',
            )
          }
        } else {
          setErrorMessage('Something went wrong. Please try again!')
        }
      },
      onSuccess: (response) => {
        localStorage.setItem(PERSIST_AUTH_KEY, 'persist')
        dispatch(setAccessToken(response.accessToken))
        navigate(pageRoutes.signupFlow, {
          state: { from: location },
          replace: true,
        })
      },
    })
  }

  return (
    <form
      className=" flex w-full flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" flex flex-col sm:flex-row sm:gap-3">
        <Input
          {...register('firstName')}
          isInvalid={!!errors.firstName}
          errorMessage={errors?.firstName?.message}
          placeholder="First name"
        />
        <Input
          {...register('secondName')}
          isInvalid={!!errors.secondName}
          errorMessage={errors?.secondName?.message}
          placeholder="Second name"
        />
      </div>
      <Input
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors?.email?.message}
        placeholder="Email"
      />
      <Input
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors?.password?.message}
        placeholder="Password"
        type="password"
      />
      <Input
        {...register('confirmPassword')}
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors?.confirmPassword?.message}
        placeholder="Confirm your password"
        type="password"
      />
      <button
        type="submit"
        className={`btn btn-primary mt-5 w-fit  self-center px-10 ${signupMutation.isPending && signupMutation.isPending ? 'btn-disabled' : ''}`}
      >
        {signupMutation.isPending && signupMutation.isPending && <Spinner />}
        Sign Up
      </button>
    </form>
  )
}

export default SignupForm
