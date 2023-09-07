// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import ScheduleEventDialog from './ScheduleEventDialog'

const meta: Meta<typeof ScheduleEventDialog> = {
  component: ScheduleEventDialog,
}

export default meta

type Story = StoryObj<typeof ScheduleEventDialog>

export const Primary: Story = {}
