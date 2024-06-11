import { Button, type ButtonProps } from './button';
import type { Meta, StoryObj } from 'storybook-framework-qwik';

const meta: Meta<ButtonProps> = {
  component: Button,
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Primary: Story = {
  args: {
    size: 'medium',
  },
  render: (props) => <Button {...props}>Some button</Button>,
};
