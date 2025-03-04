import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../../components/form/Input'
import { useLocation, useNavigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import { pageRoutes } from '../../../routes'
import { AxiosError } from 'axios'
import { useAppDispatch } from '@/src/redux/hooks'
import { setAccessToken } from '@/src/redux/user/userSlice'
import { PERSIST_AUTH_KEY } from '../constants'
import { LoginFormType, loginValidationSchema } from '../schemas'
import { Spinner } from '@/src/components/ui/spinners/Spinner'

interface Props {
  setErrorMessage: (value: string) => void
}

const LoginForm = ({ setErrorMessage }: Props) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const loginMutation = useLogin()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || pageRoutes.home

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    loginMutation.mutate(data, {
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            setErrorMessage('Wrong credentials: invalid email or password')
          }
        } else {
          setErrorMessage('Something went wrong. Please try again!')
        }
      },
      onSuccess(result) {
        if (data.persist) {
          localStorage.setItem(PERSIST_AUTH_KEY, 'persist')
        }
        dispatch(setAccessToken(result.accessToken))
        navigate(from, { replace: true })
      },
    })
  }

  return (
    <div className=" flex flex-col gap-8">
      <p>Login to Linker.</p>
      <form className=" flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
        <div className=" flex flex-1 items-center justify-between ">
          <label className="label cursor-pointer gap-2">
            <input
              {...register('persist')}
              type="checkbox"
              defaultChecked
              className="checkbox-primary checkbox checkbox-sm"
            />
            <span className="label-text">Stay signed in</span>
          </label>
          <p className=" text-sm">Forgot password?</p>
        </div>
        <button
          type="submit"
          className={` ${loginMutation.isPending ? 'btn-disabled' : ''} btn btn-primary btn-block mt-3 `}
        >
          {loginMutation.isPending && <Spinner />}
          Connect now
        </button>
      </form>
    </div>
  )
}

export default LoginForm
