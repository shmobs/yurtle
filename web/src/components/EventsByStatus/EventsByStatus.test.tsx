import { render } from '@redwoodjs/testing/web'

import EventsByStatus from './EventsByStatus'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventsByStatus', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventsByStatus />)
    }).not.toThrow()
  })
})
