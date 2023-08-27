import { render } from '@redwoodjs/testing/web'

import Location from './Location'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Location', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Location />)
    }).not.toThrow()
  })
})
