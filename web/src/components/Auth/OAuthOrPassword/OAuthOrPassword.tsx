import { OAuthButtons } from '@spoonjoy/redwoodjs-dbauth-oauth-web'

import { useOAuth } from 'src/auth'

import PasswordLoginForm from '../PasswordLoginForm/PasswordLoginForm'
import PasswordSignupForm from '../PasswordSignupForm/PasswordSignupForm'

interface IOAuthOrPasswordProps {
  type?: 'oauth' | 'password'
  action: 'login' | 'signup'
  onSignupComplete?: () => void
  onCompleteRedirectUrlOverride?: string
}

const OAuthOrPassword = ({
  type = 'oauth',
  action,
  onSignupComplete,
  onCompleteRedirectUrlOverride,
}: IOAuthOrPasswordProps) => {
  const { getOAuthUrls } = useOAuth()

  const [authnType, setAuthnType] = React.useState<'oauth' | 'password'>(type)

  return (
    <>
      {authnType === 'oauth' ? (
        <OAuthButtons
          action={action}
          getOAuthUrls={getOAuthUrls}
          redirectUrlOverride={onCompleteRedirectUrlOverride}
        />
      ) : action === 'login' ? (
        <PasswordLoginForm />
      ) : (
        <PasswordSignupForm onComplete={onSignupComplete} />
      )}
      <p className="mt-10 text-center text-sm text-gray-600">
        or{' '}
        <button
          onClick={() =>
            setAuthnType(authnType === 'oauth' ? 'password' : 'oauth')
          }
          className="link text-center font-medium"
        >
          {type === 'oauth' || type === undefined
            ? 'use your username and password'
            : 'sign in with a provider'}
        </button>
      </p>
    </>
  )
}

export default OAuthOrPassword
