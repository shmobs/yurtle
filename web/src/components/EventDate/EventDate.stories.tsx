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

import EventDate from './EventDate'

const meta: Meta<typeof EventDate> = {
  component: EventDate,
}

export default meta

type Story = StoryObj<typeof EventDate>

export const Primary: Story = {}
