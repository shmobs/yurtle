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

import PasswordSignupForm from './PasswordSignupForm'

const meta: Meta<typeof PasswordSignupForm> = {
  component: PasswordSignupForm,
}

export default meta

type Story = StoryObj<typeof PasswordSignupForm>

export const Primary: Story = {}
