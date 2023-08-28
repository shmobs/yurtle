import { render } from '@redwoodjs/testing/web'

import SearchBox from './SearchBox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SearchBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchBox />)
    }).not.toThrow()
  })
})
