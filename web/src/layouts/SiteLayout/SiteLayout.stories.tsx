import type { Meta, StoryObj } from '@storybook/react'

import SiteLayout from './SiteLayout'

const meta: Meta<typeof SiteLayout> = {
  component: SiteLayout,
}

export default meta

type Story = StoryObj<typeof SiteLayout>

export const Primary: Story = {}
