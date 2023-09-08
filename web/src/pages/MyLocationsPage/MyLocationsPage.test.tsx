import { render } from '@redwoodjs/testing/web'

import MyLocationsPage from './MyLocationsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MyLocationsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MyLocationsPage />)
    }).not.toThrow()
  })
})
