import { render } from '@redwoodjs/testing/web'

import PasswordLoginForm from './PasswordLoginForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PasswordLoginForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PasswordLoginForm />)
    }).not.toThrow()
  })
})
