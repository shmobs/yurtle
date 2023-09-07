import { render } from '@redwoodjs/testing/web'

import ScheduleEventDialog from './ScheduleEventDialog'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScheduleEventDialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScheduleEventDialog />)
    }).not.toThrow()
  })
})
