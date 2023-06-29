import type { Meta, StoryObj } from '@storybook/react';
import { LevelCard } from '../components/LevelCard/LevelCard';

const meta: Meta<typeof LevelCard> = {
  title: 'LevelCard',
  component: LevelCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LevelCard>;

export const ActiveActive: Story = {
  args: {
    status: 'active',
    level: {
      id: 3,
      title: 'Get 1 Unreleased Song',
      edition: '100/100 Claimed',
      instructions: 'You have 1 collectible. Get 1 more from past levels to continue.',
    },
    current: 3,
    actions: [
      {
        label: 'Trade Now',
        mode: 'pinkStroke',
        useIcon: false
      }
    ]
  },
};

export const ActiveOff: Story = {
  args: {
    status: 'active',
    level: {
      id: 3,
      title: 'Get 1 Unreleased Song',
      edition: '100/100 Claimed',
      instructions: 'You have 1 collectible. Get 1 more from past levels to continue.'
    },
    current: 1,
    actions: [
      {
        label: 'Level Locked',
        mode: 'pinkStroke'
      }
    ]
  },
};

export const CompletedActive: Story = {
  args: {
    status: 'completed',
    level: {
      id: 1,
      title: 'Game NFT name goes here',
      instructions: 'You have 20 collectibles.'
    },
    current: 1,
    actions: [
      {
        label: 'Trade More',
        mode: 'pink',
        useIcon: false
      },
      {
        label: 'Get More',
        mode: 'default',
        link: true
      }
    ]
  },
};

export const CompletedOff: Story = {
  args: {
    status: 'completed',
    level: {
      id: 1,
      title: 'Game NFT name goes here',
      instructions: 'You have 20 collectibles.'
    },
    current: 3,
    actions: [
      {
        label: 'Trade More',
        mode: 'pink',
        useIcon: false
      },
      {
        label: 'Get More',
        mode: 'default',
        link: true
      }
    ]
  },
};


export const UpcommingActive: Story = {
  args: {
    status: 'upcomming',
    level: {
      id: 6,
      title: 'A chance to win a 1:1 concert experience.',
      instructions: 'You need to start with 32 game NFTs',
    },
    current: 6,
    actions: []
  },
};


export const UpcommingOff: Story = {
  args: {
    status: 'upcomming',
    level: {
      id: 6,
      title: 'A chance to win a 1:1 concert experience.',
      instructions: 'You need to start with 32 game NFTs',
    },
    current: 3,
    actions: []
  },
};

export const LockedActive: Story = {
  args: {
    status: 'locked',
    level: {
      id: 4,
      title: 'Countdown to unlock',
      instructions: '24hrs:32min',
    },
    current: 4,
    actions: []
  }
};
export const LockedOff: Story = {
  args: {
    status: 'locked',
    level: {
      id: 4,
      title: 'Countdown to unlock',
      instructions: '24hrs:32min',
    },
    current: 3,
    actions: []
  }
};

export const Won: Story = {
  args: {
    status: 'won',
    level: {
      id: 6,
      title: 'Congrats! You’ve won a 1:1 concert experience!',
      instructions: ''
    }
  },
};

