import { render } from '@redwoodjs/testing/web'

import EventDate from './EventDate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventDate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventDate />)
    }).not.toThrow()
  })
})
