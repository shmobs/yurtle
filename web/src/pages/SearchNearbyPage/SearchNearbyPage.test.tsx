import { render } from '@redwoodjs/testing/web'

import SearchNearbyPage from './SearchNearbyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SearchNearbyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchNearbyPage />)
    }).not.toThrow()
  })
})
