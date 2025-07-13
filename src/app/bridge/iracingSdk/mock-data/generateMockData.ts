import type { Session, Telemetry, IrSdkBridge } from '@irdashies/types';
import mockTelemetry from './telemetry.json';
import mockSessionInfo from './session.json';

export async function generateMockDataFromPath(
  path?: string
): Promise<IrSdkBridge> {
  if (!path) {
    return generateMockData();
  }

  const telemetry = (await import(/* @vite-ignore */ `${path}/telemetry.json`))
    .default;
  const sessionInfo = (await import(/* @vite-ignore */ `${path}/session.json`))
    .default;

  return generateMockData({
    telemetry,
    sessionInfo,
  });
}

export function generateMockData(sessionData?: {
  telemetry: Telemetry | Telemetry[];
  sessionInfo: Session | Session[];
}): IrSdkBridge {
  let telemetryInterval: NodeJS.Timeout;
  let sessionInfoInterval: NodeJS.Timeout;
  let runningStateInterval: NodeJS.Timeout;

  const telemetry = sessionData?.telemetry;
  const sessionInfo = sessionData?.sessionInfo;

  let telemetryIdx = 0;
  let sessionIdx = 0;

  let prevTelemetry = mockTelemetry as unknown as Telemetry;
  
  // Track ABS/TC state for realistic simulation
  let absActive = false;
  let tcActive = false;
  let absSetting = 0;
  let tcSetting = 0;

  return {
    onTelemetry: (callback: (value: Telemetry) => void) => {
      telemetryInterval = setInterval(() => {
        let t = Array.isArray(telemetry)
          ? telemetry[telemetryIdx % telemetry.length]
          : telemetry;
        if (!t) {
          const throttleValue = prevTelemetry.Throttle.value[0];
          const brakeValue = prevTelemetry.Brake.value[0];
          
          // Simulate realistic ABS/TC behavior
          // ABS activates when braking hard
          if (brakeValue > 0.7 && Math.random() > 0.7) {
            absActive = true;
          } else if (brakeValue < 0.3) {
            absActive = false;
          }
          
          // TC activates when accelerating hard
          if (throttleValue > 0.8 && Math.random() > 0.6) {
            tcActive = true;
          } else if (throttleValue < 0.4) {
            tcActive = false;
          }
          
          // Randomly change settings occasionally
          if (Math.random() > 0.95) {
            absSetting = Math.floor(Math.random() * 4); // 0-3
          }
          if (Math.random() > 0.95) {
            tcSetting = Math.floor(Math.random() * 4); // 0-3
          }
          
          t = {
            ...prevTelemetry,
            Brake: {
              ...prevTelemetry.Brake,
              value: [jitterValue(brakeValue)],
            },
            Throttle: {
              ...prevTelemetry.Throttle,
              value: [jitterValue(throttleValue)],
            },
            Gear: {
              ...prevTelemetry.Gear,
              value: [3],
            },
            Speed: {
              ...prevTelemetry.Speed,
              value: [44],
            },
            BrakeABSactive: {
              ...prevTelemetry.BrakeABSactive,
              value: [absActive],
            },
          } as any;
          
          // Add ABS/TC fields if they exist in the mock data
          if ((prevTelemetry as any).dcTractionControlToggle) {
            (t as any).dcTractionControlToggle = {
              ...(prevTelemetry as any).dcTractionControlToggle,
              value: [tcActive],
            };
          }
          if ((prevTelemetry as any).dcABS) {
            (t as any).dcABS = {
              ...(prevTelemetry as any).dcABS,
              value: [absSetting],
            };
          }
          if ((prevTelemetry as any).dcTractionControl) {
            (t as any).dcTractionControl = {
              ...(prevTelemetry as any).dcTractionControl,
              value: [tcSetting],
            };
          }
          
          prevTelemetry = t;
        }

        telemetryIdx = telemetryIdx + 1;
        callback({ ...t });
      }, 1000 / 60);
    },
    onSessionData: (callback: (value: Session) => void) => {
      // callback({ ...sessionInfo });
      const updateSessionData = () => {
        let s = Array.isArray(sessionInfo)
          ? sessionInfo[sessionIdx % sessionInfo.length]
          : sessionInfo;

        if (!s) s = mockSessionInfo as unknown as Session;
        sessionIdx = sessionIdx + 1;

        callback(s);
      };
      updateSessionData();
      sessionInfoInterval = setInterval(updateSessionData, 2000);
    },
    onRunningState: (callback: (value: boolean) => void) => {
      callback(true); // Set initial state
      runningStateInterval = setInterval(() => {
        callback(true);
      }, 1000);
    },
    stop: () => {
      clearInterval(telemetryInterval);
      clearInterval(sessionInfoInterval);
      clearInterval(runningStateInterval);
    },
  };
}

const jitterValue = (value: number): number => {
  return Math.max(0, Math.min(1, value + Math.random() * 0.1 - 0.05));
};
