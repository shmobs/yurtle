import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import OAuthOrPassword from 'src/components/Auth/OAuthOrPassword/OAuthOrPassword'
import { SimplePageHeader } from 'src/layouts/SiteLayout'
import YurtleLogoOutline from 'src/layouts/SiteLayout/logos/YurtleLogoOutline'
import YurtleWordmark from 'src/layouts/SiteLayout/logos/YurtleWordmark'

const AuthPage = () => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Redirect to={routes.home()} />
  } else {
    return (
      <>
        <SimplePageHeader title="Log In or Sign Up" />
        <div className="sm:pb-20 sm:pt-10">
          <div className="mb-10 mt-5 flex flex-col justify-center gap-4 align-middle sm:gap-6">
            <YurtleLogoOutline className="h-14 w-auto sm:h-20" colored />
            <YurtleWordmark className="my-auto h-7 w-auto sm:h-10" colored />
          </div>

          <OAuthOrPassword className="m-auto max-w-sm" />
        </div>
      </>
    )
  }
}

export default AuthPage
