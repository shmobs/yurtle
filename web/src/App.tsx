import { SlotProvider } from 'react-view-slot'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { Toaster } from '@redwoodjs/web/toast'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth, OAuthProvider } from './auth'
import { LocationProvider } from './components/LocationContext/locationContext'

import '@spoonjoy/redwoodjs-dbauth-oauth-web/dist/style.css'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <OAuthProvider>
          <RedwoodApolloProvider useAuth={useAuth}>
            <LocationProvider>
              {/*
               * This component needs to have its type updated, but this is indeed the correct usage
               * eslint-disable-next-line @typescript-eslint/ban-ts-comment
               * @ts-ignore */}
              <SlotProvider>
                <Toaster />
                <Routes />
              </SlotProvider>
            </LocationProvider>
          </RedwoodApolloProvider>
        </OAuthProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
