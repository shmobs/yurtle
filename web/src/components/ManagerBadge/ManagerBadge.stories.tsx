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

import ManagerBadge from './ManagerBadge'

const meta: Meta<typeof ManagerBadge> = {
  component: ManagerBadge,
}

export default meta

type Story = StoryObj<typeof ManagerBadge>

export const Primary: Story = {}
