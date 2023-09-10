import { OAuthProvider } from '../src/auth'
export const decorators = [
  (Story) => (
    <div>
    <OAuthProvider>
      <Story />
    </OAuthProvider>
    </div>
  ),
]
