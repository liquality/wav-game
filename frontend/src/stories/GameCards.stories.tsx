import type { Meta, StoryObj } from '@storybook/react';
import { GameCards } from '../components/GameCards/GameCards';
import levels from '../data/levels.json';

const meta: Meta<typeof GameCards> = {
    title: 'GameCards',
    component: GameCards,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GameCards>;

export const Level1Active: Story = {
    args: {
        currentLevel: 1,
        levels
    },
};

export const Level2Active: Story = {
    args: {
        currentLevel: 2,
        levels
    },
};


export const Level3Active: Story = {
    args: {
        currentLevel: 3,
        levels
    },
};

export const Level4Active: Story = {
    args: {
        currentLevel: 4,
        levels
    },
};

export const Level5Active: Story = {
    args: {
        currentLevel: 5,
        levels
    },
};


export const Level6Active: Story = {
    args: {
        currentLevel: 6,
        levels
    },
};



