import { render } from '@redwoodjs/testing/web'

import SectionHeader from './SectionHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SectionHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SectionHeader />)
    }).not.toThrow()
  })
})
