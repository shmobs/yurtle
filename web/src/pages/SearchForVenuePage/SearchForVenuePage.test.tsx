import { render } from '@redwoodjs/testing/web'

import SearchForVenuePage from './SearchForVenuePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SearchForVenuePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchForVenuePage />)
    }).not.toThrow()
  })
})
