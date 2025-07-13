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
    tcActive: false,
    absSetting: 0,
    tcSetting: 0,
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
    tcActive: false,
    absSetting: 2,
    tcSetting: 0,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'default',
  },
};

export const TCActive: Story = {
  args: {
    absActive: false,
    tcActive: true,
    absSetting: 0,
    tcSetting: 3,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'default',
  },
};

export const BothActive: Story = {
  args: {
    absActive: true,
    tcActive: true,
    absSetting: 1,
    tcSetting: 2,
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
    tcActive: true,
    absSetting: 2,
    tcSetting: 1,
    settings: {
      enabled: true,
      showSettings: false,
    },
  },
};

export const Disabled: Story = {
  args: {
    absActive: true,
    tcActive: true,
    absSetting: 3,
    tcSetting: 3,
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
    tcActive: true,
    absSetting: 2,
    tcSetting: 3,
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
    tcActive: true,
    absSetting: 2,
    tcSetting: 3,
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
    tcActive: true,
    absSetting: 2,
    tcSetting: 3,
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
    tcActive: true,
    absSetting: 2,
    tcSetting: 3,
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
    tcActive: true,
    absSetting: 2,
    tcSetting: 3,
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
    tcActive: true,
    absSetting: 2,
    tcSetting: 3,
    settings: {
      enabled: true,
      showSettings: true,
    },
    iconStyle: 'custom',
  },
};

// Story with simulated changing data
const SimulatedData = () => {
  const [absActive, setAbsActive] = useState(false);
  const [tcActive, setTcActive] = useState(false);
  const [absSetting, setAbsSetting] = useState(0);
  const [tcSetting, setTcSetting] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate realistic ABS/TC behavior
      setAbsActive(Math.random() > 0.7);
      setTcActive(Math.random() > 0.6);
      
      // Occasionally change settings
      if (Math.random() > 0.95) {
        setAbsSetting(Math.floor(Math.random() * 4));
      }
      if (Math.random() > 0.95) {
        setTcSetting(Math.floor(Math.random() * 4));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <InputTCABS
      absActive={absActive}
      tcActive={tcActive}
      absSetting={absSetting}
      tcSetting={tcSetting}
      settings={{
        enabled: true,
        showSettings: true,
      }}
      iconStyle="default"
    />
  );
};

export const Simulated: Story = {
  render: () => <SimulatedData />,
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
                tcActive={true}
                absSetting={2}
                tcSetting={3}
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