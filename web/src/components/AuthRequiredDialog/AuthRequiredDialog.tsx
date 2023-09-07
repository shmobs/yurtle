import { navigate, useParams } from '@redwoodjs/router'

import { useAuth, useOAuth } from 'src/auth'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'

import OAuthOrPassword from '../Auth/OAuthOrPassword/OAuthOrPassword'

interface IAuthRequiredDialogProps {
  /**
   * The button to show the user when they're not authenticated.
   */
  openDialogButton: React.ReactNode
  /**
   * The button to show the user when they're authenticated.
   */
  buttonWhenAuthenticated: React.ReactNode
  /**
   * A callback to run when the user is authenticated. If the user is authenticated via a provider, this will be called when they're redirected back to the app.
   * @param withOAuthRedirect If true, the user was authenticated via a provider, and this is being called after they've been redirected back to the app.
   */
  onAuthenticated?: (withOAuthRedirect?: boolean) => void
  /**
   * To know that we've been redirected back to the app after authenticating via a provider, we need to pass a query param. This is the value of that query param.
   * You need to manually set this to a unique value if you're using multiple instances of this component on the same page.
   * @default 'authenticated'
   */
  onAuthenticatedCallbackAction?: string
  title?: string
  description?: string
}

/**
 * Use this component to wrap a button that requires authentication to perform an action.
 * When the user clicks the button, if they're not logged in, they will be prompted to log in or sign up.
 * If they are logged in, the buttonWhenAuthenticated will be rendered instead.
 */
const AuthRequiredDialog = ({
  openDialogButton,
  buttonWhenAuthenticated,
  onAuthenticated,
  onAuthenticatedCallbackAction = 'authenticated',
  title = 'Log in or sign up to do this',
  description,
}: IAuthRequiredDialogProps) => {
  // needed to trigger the error handling flow
  useOAuth()
  const { currentUser } = useAuth()
  // used to activate the onAuthenticated callback when authenticated via a provider, as we need to rely on being redirected back to the app
  const { action, ..._otherParams } = useParams()

  if (action === onAuthenticatedCallbackAction) {
    console.log("got redirect with action 'authenticated'")
    // const searchParams = new URLSearchParams(otherParams)
    // navigate(`${window.location.pathname}?${searchParams.toString()}`)
    // this will lose the query params, but but doing the above includes any QSPs that are part of the route, which is ugly, so I disabled it. If we need to save QSPs, we can reenable it.
    navigate(window.location.pathname)
    onAuthenticated?.(true)
  }
  if (currentUser) {
    return buttonWhenAuthenticated
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>{openDialogButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <OAuthOrPassword
            className="mt-3"
            onCompleteRedirectUrlOverride={`${
              window.location.origin + window.location.pathname
            }?action=${onAuthenticatedCallbackAction}`}
            onAuthenticated={onAuthenticated}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

export default AuthRequiredDialog
