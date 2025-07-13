import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputTCABS } from './InputTCABS';
import { useState, useEffect } from 'react';

const meta: Meta<typeof InputTCABS> = {
  component: InputTCABS,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InputTCABS>;

export const Default: Story = {
  args: {
    absActive: false,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'default',
  },
};

export const ABSActive: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'default',
  },
};

export const NoSettings: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: true,
      showSettings: false,
    },
  },
};

export const Disabled: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: false,
      showSettings: true,
    },
  },
};

// Icon Style Options
export const DefaultIcons: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'default',
  },
};

export const AutomotiveIcons: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'automotive',
  },
};

export const TechnicalIcons: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'technical',
  },
};

export const SafetyIcons: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'safety',
  },
};

export const ModernIcons: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'modern',
  },
};

export const CustomIcons: Story = {
  args: {
    absActive: true,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'custom',
  },
};

// Icon Style Comparison
const IconStyleComparison = () => {
  const styles = ['default', 'automotive', 'technical', 'safety', 'modern', 'custom'] as const;
  
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold mb-2">Icon Style Options</h3>
      <div className="flex gap-4">
        {styles.map((style) => (
          <div key={style} className="flex flex-col items-center">
            <h4 className="text-sm font-semibold mb-2 capitalize">{style}</h4>
            <div className="h-32 w-20 border border-gray-300 rounded">
              <InputTCABS
                absActive={true}
                settings={{
                  enabled: true,
                  showSettings: true,
                }}
                iconStyle={style}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const IconComparison: Story = {
  render: () => <IconStyleComparison />,
}; 