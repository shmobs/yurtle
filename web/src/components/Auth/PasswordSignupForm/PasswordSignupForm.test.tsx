import { render } from '@redwoodjs/testing/web'

import PasswordSignupForm from './PasswordSignupForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PasswordSignupForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PasswordSignupForm />)
    }).not.toThrow()
  })
})
