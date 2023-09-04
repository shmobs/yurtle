import { render } from '@redwoodjs/testing/web'

import AuthRequiredDialog from './AuthRequiredDialog'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AuthRequiredDialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthRequiredDialog />)
    }).not.toThrow()
  })
})
