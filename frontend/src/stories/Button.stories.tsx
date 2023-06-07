import type { Meta, StoryObj } from '@storybook/react';

import { ReactComponent as LockIcon } from "../images/lock_icon.svg";
import { Button } from '../components/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    mode: 'default',
    children: 'Trade',
  },
};

export const Pink: Story = {
  args: {
    mode: 'pink',
    children: 'Trade',
  },
};

export const Inactive: Story = {
  args: {
    mode: 'inactive',
    children: 'Trade',
  },
};

export const Stroke: Story = {
  args: {
    mode: 'stroke',
    children: 'Trade',
  },
};


export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Trade',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Trade',
  },
};


export const Icon: Story = {
  args: {
    size: 'large',
    mode: 'pink',
    children: <><LockIcon style={{ marginRight: '0.5rem' }} /> {'Trade'}</>
  },
};

