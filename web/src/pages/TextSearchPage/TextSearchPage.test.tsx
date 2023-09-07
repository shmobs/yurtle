import { render } from '@redwoodjs/testing/web'

import TextSearchPage from './TextSearchPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TextSearchPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TextSearchPage />)
    }).not.toThrow()
  })
})
