import { render } from '@redwoodjs/testing/web'

import Business from './Business'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Business', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Business />)
    }).not.toThrow()
  })
})
