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

import Location from './Location'

const meta: Meta<typeof Location> = {
  component: Location,
}

export default meta

type Story = StoryObj<typeof Location>

export const Primary: Story = {}
