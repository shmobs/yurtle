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

import PasswordLoginForm from './PasswordLoginForm'

const meta: Meta<typeof PasswordLoginForm> = {
  component: PasswordLoginForm,
}

export default meta

type Story = StoryObj<typeof PasswordLoginForm>

export const Primary: Story = {}
