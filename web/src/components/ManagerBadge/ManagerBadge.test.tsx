import { render } from '@redwoodjs/testing/web'

import ManagerBadge from './ManagerBadge'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ManagerBadge', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ManagerBadge />)
    }).not.toThrow()
  })
})
