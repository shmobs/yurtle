import { render } from '@redwoodjs/testing/web'

import SearchNearby from './SearchNearby'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SearchNearby', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchNearby />)
    }).not.toThrow()
  })
})
