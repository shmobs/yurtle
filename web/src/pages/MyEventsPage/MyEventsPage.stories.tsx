import type { Meta, StoryObj } from '@storybook/react'

import MyEventsPage from './MyEventsPage'

const meta: Meta<typeof MyEventsPage> = {
  component: MyEventsPage,
}

export default meta

type Story = StoryObj<typeof MyEventsPage>

export const Primary: Story = {}
