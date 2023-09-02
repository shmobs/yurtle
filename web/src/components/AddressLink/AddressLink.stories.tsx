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

import AddressLink from './AddressLink'

const meta: Meta<typeof AddressLink> = {
  component: AddressLink,
}

export default meta

type Story = StoryObj<typeof AddressLink>

export const Primary: Story = {}
