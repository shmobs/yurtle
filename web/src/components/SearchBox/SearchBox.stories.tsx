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

import SearchBox from './SearchBox'

const meta: Meta<typeof SearchBox> = {
  component: SearchBox,
}

export default meta

type Story = StoryObj<typeof SearchBox>

export const Primary: Story = {}
