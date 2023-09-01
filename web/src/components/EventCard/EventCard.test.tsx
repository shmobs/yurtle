import { render } from '@redwoodjs/testing/web'

import EventCard from './EventCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventCard />)
    }).not.toThrow()
  })
})
