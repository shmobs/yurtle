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

import OAuthOrPassword from './OAuthOrPassword'

const meta: Meta<typeof OAuthOrPassword> = {
  component: OAuthOrPassword,
}

export default meta

type Story = StoryObj<typeof OAuthOrPassword>

export const Primary: Story = {}
