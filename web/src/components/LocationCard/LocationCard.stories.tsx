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

import LocationCard from './LocationCard'

const meta: Meta<typeof LocationCard> = {
  component: LocationCard,
}

export default meta

type Story = StoryObj<typeof LocationCard>

export const Primary: Story = {}
