import { render } from '@redwoodjs/testing/web'

import ClaimLocationDialog from './ClaimLocationDialog'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClaimLocationDialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClaimLocationDialog />)
    }).not.toThrow()
  })
})
