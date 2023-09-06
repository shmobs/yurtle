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

import ClaimLocationDialog from './ClaimLocationDialog'

const meta: Meta<typeof ClaimLocationDialog> = {
  component: ClaimLocationDialog,
}

export default meta

type Story = StoryObj<typeof ClaimLocationDialog>

export const Primary: Story = {}
