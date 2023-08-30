import { render } from '@redwoodjs/testing/web'

import Vibes from './Vibes'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Vibes', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Vibes />)
    }).not.toThrow()
  })
})
