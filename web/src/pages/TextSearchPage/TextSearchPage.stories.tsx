import type { Meta, StoryObj } from '@storybook/react'

import TextSearchPage from './TextSearchPage'

const meta: Meta<typeof TextSearchPage> = {
  component: TextSearchPage,
}

export default meta

type Story = StoryObj<typeof TextSearchPage>

export const Primary: Story = {}
