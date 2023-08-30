import { render } from '@redwoodjs/testing/web'

import HorizontalSnapScroll from './HorizontalSnapScroll'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HorizontalSnapScroll', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HorizontalSnapScroll />)
    }).not.toThrow()
  })
})
