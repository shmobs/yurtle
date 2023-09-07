import { render } from '@redwoodjs/testing/web'

import LocationsAndEvents from './LocationsAndEvents'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LocationsAndEvents', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LocationsAndEvents />)
    }).not.toThrow()
  })
})
