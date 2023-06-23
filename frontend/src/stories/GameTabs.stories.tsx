import type { Meta, StoryObj } from '@storybook/react';
import { GameTabs } from '../components/GameTabs/GameTabs';

const meta: Meta<typeof GameTabs> = {
    title: 'GameTabs',
    component: GameTabs,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GameTabs>;

export const LevelTab1Active: Story = {
    args: {
        selectedLevel: 1
    },
};




