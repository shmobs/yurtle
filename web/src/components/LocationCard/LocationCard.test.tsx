import { render } from '@redwoodjs/testing/web'

import LocationCard from './LocationCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LocationCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LocationCard />)
    }).not.toThrow()
  })
})
