import { OAuthButtons } from '@spoonjoy/redwoodjs-dbauth-oauth-web'

import { useOAuth } from 'src/auth'

import PasswordLoginForm from '../PasswordLoginForm/PasswordLoginForm'
import PasswordSignupForm from '../PasswordSignupForm/PasswordSignupForm'

interface IOAuthOrPasswordProps {
  type: 'oauth' | 'password' | undefined
  action: 'login' | 'signup'
  onSignupComplete?: () => void
  onCompleteRedirectUrlOverride?: string
}

const OAuthOrPassword = ({
  type,
  action,
  onSignupComplete,
  onCompleteRedirectUrlOverride,
}: IOAuthOrPasswordProps) => {
  const { getOAuthUrls } = useOAuth()

  const getOAuthUrlsWithCustomRedirect = () => {
    if (onCompleteRedirectUrlOverride)
      return getOAuthUrls({
        redirectUrlOverride: onCompleteRedirectUrlOverride,
      })
  }
  return (
    <div>
      <h2>{'OAuthOrPassword'}</h2>
      <p>
        {'Find me in ./web/src/components/OAuthOrPassword/OAuthOrPassword.tsx'}
      </p>
    </div>
  )
}

export default OAuthOrPassword
