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

import Event from './Event'

const meta: Meta<typeof Event> = {
  component: Event,
}

export default meta

type Story = StoryObj<typeof Event>

export const Primary: Story = {}
