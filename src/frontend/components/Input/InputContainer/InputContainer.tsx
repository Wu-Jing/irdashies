import { InputBar } from '../InputBar/InputBar';
import { InputGear } from '../InputGear/InputGear';
import { InputTrace } from '../InputTrace/InputTrace';
import { InputTCABS } from '../InputTCABS/InputTCABS';

export interface InputProps {
  brake?: number;
  throttle?: number;
  clutch?: number;
  gear?: number;
  speed?: number;
  unit?: number;
  absActive?: boolean;
  settings?: InputSettings;
}

export interface InputSettings {
  trace: {
    enabled: boolean;
    includeThrottle: boolean;
    includeBrake: boolean;
  };
  bar: {
    enabled: boolean;
    includeClutch: boolean;
    includeBrake: boolean;
    includeThrottle: boolean;
  };
  gear: {
    enabled: boolean;
    unit: 'mph' | 'km/h' | 'auto';
  };
  tcabs: {
    enabled: boolean;
  };
}

export const InputContainer = ({
  brake,
  throttle,
  clutch,
  gear,
  speed,
  unit,
  absActive,
  settings,
}: InputProps) => {
  return (
    <div className="w-full h-full inline-flex gap-1 p-2 flex-row bg-slate-800/50">
      {settings?.trace.enabled && <InputTrace input={{ brake, throttle }} settings={settings.trace} />}
      {settings?.bar.enabled && <InputBar brake={brake} throttle={throttle} clutch={clutch} settings={settings.bar} />}
      {settings?.gear.enabled && <InputGear gear={gear} speedMs={speed} unit={unit} settings={settings.gear} />}
      <div className="w-32">
        <InputTCABS 
          absActive={absActive} 
          settings={settings?.tcabs}
          iconStyle="custom"
        />
      </div>
      {/* <InputSteer /> */} {/* WIP */}
    </div>
  );
};
