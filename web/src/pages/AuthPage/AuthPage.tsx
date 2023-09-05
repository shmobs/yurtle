import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import OAuthOrPassword from 'src/components/Auth/OAuthOrPassword/OAuthOrPassword'
import { SimplePageHeader } from 'src/layouts/SiteLayout'

const AuthPage = () => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Redirect to={routes.home()} />
  } else {
    return (
      <>
        <SimplePageHeader title="Log In or Sign Up" />

        <div className="flex h-full flex-col justify-center">
          <OAuthOrPassword />
        </div>
      </>
    )
  }
}

export default AuthPage
