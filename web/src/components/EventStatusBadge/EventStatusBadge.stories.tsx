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

import EventStatusBadge from './EventStatusBadge'

const meta: Meta<typeof EventStatusBadge> = {
  component: EventStatusBadge,
}

export default meta

type Story = StoryObj<typeof EventStatusBadge>

export const Primary: Story = {}
