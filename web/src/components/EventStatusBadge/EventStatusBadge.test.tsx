import { render } from '@redwoodjs/testing/web'

import EventStatusBadge from './EventStatusBadge'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventStatusBadge', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventStatusBadge />)
    }).not.toThrow()
  })
})
