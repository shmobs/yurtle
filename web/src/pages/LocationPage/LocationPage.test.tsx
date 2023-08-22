import { render } from '@redwoodjs/testing/web'

import LocationPage from './LocationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LocationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LocationPage />)
    }).not.toThrow()
  })
})
