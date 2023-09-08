import { render } from '@redwoodjs/testing/web'

import MyEventsPage from './MyEventsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MyEventsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MyEventsPage />)
    }).not.toThrow()
  })
})
