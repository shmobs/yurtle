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

import AuthRequiredDialog from './AuthRequiredDialog'

const meta: Meta<typeof AuthRequiredDialog> = {
  component: AuthRequiredDialog,
}

export default meta

type Story = StoryObj<typeof AuthRequiredDialog>

export const Primary: Story = {}
