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

import Vibes from './Vibes'

const meta: Meta<typeof Vibes> = {
  component: Vibes,
}

export default meta

type Story = StoryObj<typeof Vibes>

export const Primary: Story = {}
