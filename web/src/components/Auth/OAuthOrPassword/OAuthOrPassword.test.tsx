import { render } from '@redwoodjs/testing/web'

import OAuthOrPassword from './OAuthOrPassword'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OAuthOrPassword', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OAuthOrPassword />)
    }).not.toThrow()
  })
})
