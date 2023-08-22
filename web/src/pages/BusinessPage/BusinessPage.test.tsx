import { render } from '@redwoodjs/testing/web'

import BusinessPage from './BusinessPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BusinessPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BusinessPage />)
    }).not.toThrow()
  })
})
