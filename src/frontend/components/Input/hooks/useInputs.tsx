import { useTelemetryValue } from '@irdashies/context';

export const useInputs = () => {
  const brake = useTelemetryValue('Brake');
  const throttle = useTelemetryValue('Throttle');
  const clutch = useTelemetryValue('Clutch');
  const gear = useTelemetryValue('Gear');
  const speed = useTelemetryValue('Speed');
  const unit = useTelemetryValue('DisplayUnits');
  
  // ABS and TC data - using type assertion since these might not be in generated types yet
  const absActive = useTelemetryValue('BrakeABSactive');
  const tcActive = useTelemetryValue('dcTractionControlToggle' as any);
  const absSetting = useTelemetryValue('dcABS' as any);
  const tcSetting = useTelemetryValue('dcTractionControl' as any);

  return { 
    brake, 
    throttle, 
    clutch, 
    gear, 
    speed, 
    unit,
    absActive,
    tcActive,
    absSetting,
    tcSetting
  };
};
