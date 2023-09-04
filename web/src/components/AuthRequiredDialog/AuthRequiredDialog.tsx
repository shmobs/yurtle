import { navigate, useParams } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
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
  onAuthenticated?: () => void
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
  title = 'Log in or sign up to do this',
  description,
}: IAuthRequiredDialogProps) => {
  const { currentUser } = useAuth()
  // used to activate the onAuthenticated callback when authenticated via a provider, as we need to rely on being redirected back to the app
  const { action, ..._otherParams } = useParams()

  if (action === 'authenticated') {
    console.log("got redirect with action 'authenticated'")
    // const searchParams = new URLSearchParams(otherParams)
    // navigate(`${window.location.pathname}?${searchParams.toString()}`)
    // this will lose the query params, but but doing the above includes any QSPs that are part of the route, which is ugly, so I disabled it. If we need to save QSPs, we can reenable it.
    navigate(window.location.pathname)
    onAuthenticated?.()
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
            }?action=authenticated`}
            onAuthenticated={onAuthenticated}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

export default AuthRequiredDialog
