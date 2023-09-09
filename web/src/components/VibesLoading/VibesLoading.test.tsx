import { render } from '@redwoodjs/testing/web'

import VibesLoading from './VibesLoading'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VibesLoading', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VibesLoading />)
    }).not.toThrow()
  })
})
