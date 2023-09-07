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

import EventsByStatus from './EventsByStatus'

const meta: Meta<typeof EventsByStatus> = {
  component: EventsByStatus,
}

export default meta

type Story = StoryObj<typeof EventsByStatus>

export const Primary: Story = {}
