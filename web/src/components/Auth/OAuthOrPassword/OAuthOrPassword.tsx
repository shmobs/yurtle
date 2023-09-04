import { OAuthButtons } from '@spoonjoy/redwoodjs-dbauth-oauth-web'

import { useOAuth } from 'src/auth'

import PasswordLoginForm from '../PasswordLoginForm/PasswordLoginForm'
import PasswordSignupForm from '../PasswordSignupForm/PasswordSignupForm'

interface IOAuthOrPasswordProps {
  type?: 'oauth' | 'password'
  action?: 'login' | 'signup'
  onSignupComplete?: () => void
  onCompleteRedirectUrlOverride?: string
}

const OAuthOrPassword = ({
  type: typeInit = 'oauth',
  action: actionInit = 'signup',
  onSignupComplete,
  onCompleteRedirectUrlOverride,
}: IOAuthOrPasswordProps) => {
  const { getOAuthUrls } = useOAuth()

  const [authnType, setAuthnType] = React.useState<'oauth' | 'password'>(
    typeInit
  )
  const [action, setAction] = React.useState<'login' | 'signup'>(actionInit)

  return (
    <>
      <p className="mt-10 text-center text-sm text-gray-600">
        or{' '}
        <button
          onClick={() => setAction(action === 'login' ? 'signup' : 'login')}
          className="link text-center font-medium"
        >
          {action === 'login' ? 'sign up' : 'log in'}
        </button>
      </p>
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
          {authnType === 'oauth'
            ? 'use your username and password'
            : action === 'login'
            ? 'sign in with a provider'
            : 'sign up with a provider'}
        </button>
      </p>
    </>
  )
}

export default OAuthOrPassword
