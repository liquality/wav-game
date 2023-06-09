import type { Meta, StoryObj } from '@storybook/react';
import { LevelTab } from '../components/LevelTab/LevelTab';

const meta: Meta<typeof LevelTab> = {
    title: 'LevelTab',
    component: LevelTab,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LevelTab>;

export const LevelTabActive: Story = {
    args: {
        level: 1,
        status: 'active'
    },
};

export const LevelTabCompleted: Story = {
    args: {
        level: 1,
        status: 'completed'
    },
};

export const LevelTabLocked: Story = {
    args: {
        level: 1,
        status: 'locked'
    },
};

export const LevelTabUpcomming: Story = {
    args: {
        level: 1,
        status: 'upcomming'
    },
};

export const LevelTabWon: Story = {
    args: {
        level: 1,
        status: 'won'
    },
};


