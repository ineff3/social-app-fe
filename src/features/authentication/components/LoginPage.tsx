import { Link, Outlet } from 'react-router-dom'
import LoginForm from './LoginForm'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { GoogleIconSvg } from '@/src/components/ui/icons/GoogleIconSvg'
import { apiRoutes } from '@/src/routes'
import { LinkerIcon } from '@/src/components/ui/LinkerIcon'

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const redirectToGoogleSignin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}${apiRoutes.googleLogin}`
  }

  return (
    <>
      <Helmet>
        <title>Login | Linker</title>
        <meta
          name="description"
          content="Log in to Linker and connect with people from around the world."
        />
        <meta property="og:title" content="Login | Linker" />
        <meta
          property="og:description"
          content="Log in to Linker and start sharing your thoughts."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className=" mx-auto flex w-full max-w-screen-lg flex-auto flex-col-reverse items-center justify-between font-montserrat md:flex-row md:items-stretch">
        <div className=" flex w-full max-w-xl flex-1 flex-shrink flex-col items-center pb-5 pt-10 text-secondary md:items-baseline md:border-r md:border-accent md:pl-7">
          <div className=" flex flex-col items-center md:items-stretch">
            <div className=" text-center md:text-start">
              <p className="  mb-5 max-w-md text-2xl font-bold sm:text-3xl ">
                <span className=" text-primary">See what&apos;s happening</span>{' '}
                <br />
                around you right now
              </p>
              <p className=" text-md mb-5 ">
                Join your friends on Linker today!
              </p>
            </div>
            <img
              className=" min-w-[400px] max-w-full "
              src="/social-girl1.png"
              alt="socials"
            />
          </div>
          <div className=" flex w-full max-w-[415px] flex-1 flex-col items-center justify-end text-sm text-base-content">
            © 2025 Linker, Inc.
          </div>
        </div>
        <div className=" flex w-full max-w-md flex-col gap-10 px-5 py-5 sm:px-10 sm:py-10">
          <div className=" flex items-center justify-between">
            <LinkerIcon />
            <p className=" text-sm">
              Don&apos;t have an account?{' '}
              <Link to="signup" className=" link text-primary ">
                Signup
              </Link>
            </p>
          </div>
          <p className=" text-2xl font-bold text-secondary sm:text-3xl">
            Find out what&apos;s trending.
          </p>
          <div>
            <LoginForm setErrorMessage={setErrorMessage} />
            {errorMessage && (
              <p className=" mt-2 text-center text-sm text-error">
                {errorMessage}
              </p>
            )}
          </div>
          <div className="divider divider-accent">or</div>
          <button className="btn btn-accent" onClick={redirectToGoogleSignin}>
            <div className="items center flex gap-2">
              <GoogleIconSvg width={18} height={18} />
              <span className="mt-[2px]">Sign in via Google</span>
            </div>
          </button>
        </div>
        <Outlet />
      </div>
    </>
  )
}
