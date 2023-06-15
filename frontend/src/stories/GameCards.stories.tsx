import type { Meta, StoryObj } from '@storybook/react';
import { GameCards } from '../components/GameCards/GameCards';

const meta: Meta<typeof GameCards> = {
    title: 'GameCards',
    component: GameCards,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GameCards>;
const currentGame = {
    "id" : 1,
    "status" : "not_started",
    "user_id" : 1,
    "level" : null,
    "artist_name" : "tarot",
    "level_4_claimed_prizes" : null,
    "level_5_claimed_prizes" : null,
    "level_6_claimed_main_prize" : null,
    "claimable_prize_count" : null,
    "game_symbol_id" : 2000
};

const onTradeClick = (level: number) => {
    console.log('onTradeClick', level);
};
const onGetMoreClick = (level: number) => {
            console.log('onGetMoreClick', level);
        };

export const Level1Active: Story = {
    args: {
        currentGame: {...currentGame, level: 1},
        onTradeClick,
        onGetMoreClick
    },
};

export const Level2Active: Story = {
    args: {
        currentGame: {...currentGame, level: 2},
        onTradeClick,
        onGetMoreClick
    },
};


export const Level3Active: Story = {
    args: {
        currentGame: {...currentGame, level: 3},
        onTradeClick,
        onGetMoreClick
    },
};

export const Level4Active: Story = {
    args: {
        currentGame: {...currentGame, level: 4},
        onTradeClick,
        onGetMoreClick
    },
};

export const Level5Active: Story = {
    args: {
        currentGame: {...currentGame, level: 5},
        onTradeClick,
        onGetMoreClick
    },
};


export const Level6Active: Story = {
    args: {
        currentGame: {...currentGame, level: 6},
        onTradeClick,
        onGetMoreClick
    },
};



