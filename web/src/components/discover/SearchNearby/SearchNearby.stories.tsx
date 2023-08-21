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

import SearchNearby from './SearchNearby'

const meta: Meta<typeof SearchNearby> = {
  component: SearchNearby,
}

export default meta

type Story = StoryObj<typeof SearchNearby>

export const Primary: Story = {}
