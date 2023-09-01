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

import EventCard from './EventCard'

const meta: Meta<typeof EventCard> = {
  component: EventCard,
}

export default meta

type Story = StoryObj<typeof EventCard>

export const Primary: Story = {}
