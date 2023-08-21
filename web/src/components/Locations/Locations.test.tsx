import { render } from '@redwoodjs/testing/web'

import Locations from './Locations'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Locations', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Locations />)
    }).not.toThrow()
  })
})
