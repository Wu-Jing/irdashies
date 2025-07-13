import type { INativeSDK } from '../../native';
import type {
  TelemetryVarList, TelemetryVariable, BroadcastMessages, CameraState, ReplayPositionCommand, ReplaySearchCommand, ReplayStateCommand, ReloadTexturesCommand, ChatCommand, PitCommand, TelemetryCommand, FFBCommand, VideoCaptureCommand,
} from '../../types';

import { loadMockSessionData, loadMockTelemetry } from './mock-data/loader';

let mockTelemetry: TelemetryVarList | null = null;
let MOCK_SESSION: string | null = null;

// Track ABS/TC state for realistic simulation
let absActive = false;
let tcActive = false;
let absSetting = 0;
let tcSetting = 0;

export class MockSDK implements INativeSDK {
  public currDataVersion: number;

  public enableLogging: boolean;

  private _isRunning: boolean;

  constructor() {
    this.currDataVersion = 1;
    this.enableLogging = false;
    this._isRunning = false;
    void this._loadMockData();
    console.warn(
      'Attempting to access iRacing SDK on unsupported platform!',
      '\nReturning mock SDK for testing purposes. (Only win32 supported)',
    );
  }

  private async _loadMockData(): Promise<void> {
    const [session, telemetry] = await Promise.all([
      !MOCK_SESSION ? loadMockSessionData() : Promise.resolve(MOCK_SESSION),
      !mockTelemetry ? loadMockTelemetry() : Promise.resolve(mockTelemetry),
    ]);
    MOCK_SESSION = session;
    mockTelemetry = telemetry;
  }

  public startSDK(): boolean {
    this._isRunning = true;
    return true;
  }

  public stopSDK(): void {
    this._isRunning = false;
  }

  public isRunning(): boolean {
    return this._isRunning && MOCK_SESSION !== null && mockTelemetry !== null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public waitForData(_timeout?: number): boolean {
    return this._isRunning;
  }

  public getSessionData(): string {
    return MOCK_SESSION ?? '';
  }

  public getTelemetryData(): TelemetryVarList {
    if (!mockTelemetry) {
      return {} as TelemetryVarList;
    }

    // Get current brake and throttle values
    const brakeValue = mockTelemetry.Brake?.value?.[0] ?? 0;
    const throttleValue = mockTelemetry.Throttle?.value?.[0] ?? 0;

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

    // Create dynamic telemetry data with ABS/TC
    const dynamicTelemetry = {
      ...mockTelemetry,
      BrakeABSactive: {
        ...mockTelemetry.BrakeABSactive,
        value: [absActive],
      },
    } as any;

    // Add ABS/TC fields if they exist
    if ((mockTelemetry as any).dcTractionControlToggle) {
      dynamicTelemetry.dcTractionControlToggle = {
        ...(mockTelemetry as any).dcTractionControlToggle,
        value: [tcActive],
      };
    }
    if ((mockTelemetry as any).dcABS) {
      dynamicTelemetry.dcABS = {
        ...(mockTelemetry as any).dcABS,
        value: [absSetting],
      };
    }
    if ((mockTelemetry as any).dcTractionControl) {
      dynamicTelemetry.dcTractionControl = {
        ...(mockTelemetry as any).dcTractionControl,
        value: [tcSetting],
      };
    }

    return dynamicTelemetry;
  }

  public getTelemetryVariable<T extends boolean | number | string>(index: number): TelemetryVariable<T[]>;

  // eslint-disable-next-line @typescript-eslint/unified-signatures
  public getTelemetryVariable<T extends boolean | number | string>(name: keyof TelemetryVarList): TelemetryVariable<T[]>;

  // Really need to fix the types here.
  public getTelemetryVariable<T extends boolean | number | string>(name: keyof TelemetryVarList | number): TelemetryVariable<T[]> {
    const telemetryData = this.getTelemetryData();
    if (typeof name === 'number') {
      return Object.values(telemetryData)[name] as TelemetryVariable<T[]>;
    }
    return telemetryData[name] as TelemetryVariable<T[]>;
  }

  public broadcast(message: BroadcastMessages.CameraSwitchPos, pos: number, group: number, camera: number): void;

  // eslint-disable-next-line @typescript-eslint/unified-signatures
  public broadcast(message: BroadcastMessages.CameraSwitchNum, driver: number, group: number, camera: number): void;

  public broadcast(message: BroadcastMessages.CameraSetState, state: CameraState): void;

  public broadcast(message: BroadcastMessages.ReplaySetPlaySpeed, speed: number, slowMotion: number): void;

  public broadcast(message: BroadcastMessages.ReplaySetPlayPosition, pos: ReplayPositionCommand, frame: number): void;

  public broadcast(message: BroadcastMessages.ReplaySearch, mode: ReplaySearchCommand): void;

  public broadcast(message: BroadcastMessages.ReplaySetState, state: ReplayStateCommand): void;

  public broadcast(message: BroadcastMessages.ReloadTextures, command: ReloadTexturesCommand, carIndex?: number): void;

  public broadcast(message: BroadcastMessages.ChatCommand, command: ChatCommand, macro?: number): void;

  public broadcast(message: BroadcastMessages.PitCommand, command: PitCommand, param?: number): void;

  public broadcast(message: BroadcastMessages.TelemCommand, command: TelemetryCommand): void;

  public broadcast(message: BroadcastMessages.FFBCommand, command: FFBCommand, value: number): void;

  // eslint-disable-next-line @typescript-eslint/unified-signatures
  public broadcast(message: BroadcastMessages.ReplaySearchSessionTime, session: number, time: number): void;

  public broadcast(message: BroadcastMessages.VideoCapture, command: VideoCaptureCommand): void;

  public broadcast(...args: number[]): void {
    console.log('Pretending to trigger SDK call:', ...args);
  }
}
