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

import Locations from './Locations'

const meta: Meta<typeof Locations> = {
  component: Locations,
}

export default meta

type Story = StoryObj<typeof Locations>

export const Primary: Story = {}
