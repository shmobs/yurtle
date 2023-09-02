import { render } from '@redwoodjs/testing/web'

import AddressLink from './AddressLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddressLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddressLink />)
    }).not.toThrow()
  })
})
