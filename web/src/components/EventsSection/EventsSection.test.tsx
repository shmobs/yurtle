import { render } from '@redwoodjs/testing/web'

import EventsSection from './EventsSection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventsSection', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventsSection />)
    }).not.toThrow()
  })
})
