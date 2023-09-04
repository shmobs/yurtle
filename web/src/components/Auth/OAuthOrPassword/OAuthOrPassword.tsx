import { OAuthButtons } from '@spoonjoy/redwoodjs-dbauth-oauth-web'

import { useOAuth } from 'src/auth'

import PasswordLoginForm from '../PasswordLoginForm/PasswordLoginForm'
import PasswordSignupForm from '../PasswordSignupForm/PasswordSignupForm'

interface IOAuthOrPasswordProps {
  type?: 'oauth' | 'password'
  action?: 'login' | 'signup'
  onAuthenticated?: () => void
  onCompleteRedirectUrlOverride?: string
  className?: string
}

const OAuthOrPassword = ({
  type: typeInit = 'oauth',
  action: actionInit = 'signup',
  onAuthenticated,
  onCompleteRedirectUrlOverride,
  className,
}: IOAuthOrPasswordProps) => {
  const { getOAuthUrls } = useOAuth()

  const [authnType, setAuthnType] = React.useState<'oauth' | 'password'>(
    typeInit
  )
  const [action, setAction] = React.useState<'login' | 'signup'>(actionInit)

  console.log('In OAuthOrPassword')

  return (
    <div className={className}>
      {authnType === 'oauth' ? (
        <OAuthButtons
          action={action}
          getOAuthUrls={getOAuthUrls}
          redirectUrlOverride={onCompleteRedirectUrlOverride}
        />
      ) : action === 'login' ? (
        <PasswordLoginForm onComplete={onAuthenticated} />
      ) : (
        <PasswordSignupForm onComplete={onAuthenticated} />
      )}
      <p className="mt-2 text-center text-sm text-gray-600">
        or{' '}
        <button
          onClick={() => setAction(action === 'login' ? 'signup' : 'login')}
          className="link text-center font-medium"
        >
          {action === 'login' ? 'sign up' : 'log in'}
        </button>
      </p>
      <p className="mt-2 text-center text-sm text-gray-600">
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
    </div>
  )
}

export default OAuthOrPassword
