import {
  createOAuthClient,
  createOAuth,
} from '@spoonjoy/redwoodjs-dbauth-oauth-web'

import { createDbAuthClient, createAuth } from '@redwoodjs/auth-dbauth-web'
import { toast } from '@redwoodjs/web/toast'

const dbAuthClient = createDbAuthClient()

const onOAuthError = (error: string) => {
  toast.error(error)
}

const oAuthClient = createOAuthClient({
  enabledProviders: { apple: false, github: false, google: false },
})

export const { AuthProvider, useAuth } = createAuth(dbAuthClient)
export const { OAuthProvider, useOAuth } = createOAuth(
  oAuthClient,
  onOAuthError
)
