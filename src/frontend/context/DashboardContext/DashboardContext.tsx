import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import type { DashboardBridge, DashboardLayout, GeneralSettingsType } from '@irdashies/types';

interface DashboardContextProps {
  editMode: boolean;
  currentDashboard: DashboardLayout | undefined;
  onDashboardUpdated?: (dashboard: DashboardLayout) => void;
  resetDashboard: (resetEverything: boolean) => Promise<DashboardLayout>;
  bridge: DashboardBridge;
  version: string;
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{
  bridge: DashboardBridge;
  children: ReactNode;
}> = ({ bridge, children }) => {
  const [dashboard, setDashboard] = useState<DashboardLayout>();
  const [editMode, setEditMode] = useState(false);
  const [version, setVersion] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    bridge.reloadDashboard();
    bridge.dashboardUpdated((dashboard) => setDashboard(dashboard));
    bridge.onEditModeToggled((editMode) => setEditMode(editMode));
    bridge.getAppVersion?.().then((version) => setVersion(version));
  }, [bridge]);

  const saveDashboard = (dashboard: DashboardLayout) => {
    bridge.saveDashboard(dashboard);
  };

  const resetDashboard = async (resetEverything: boolean) => {
    const result = await bridge.resetDashboard(resetEverything);
    setDashboard(result);
    return result;
  };

  const toggleDemoMode = () => {
    const newDemoMode = !isDemoMode;
    setIsDemoMode(newDemoMode);
    // Notify the bridge about demo mode change
    bridge.toggleDemoMode?.(newDemoMode);
  };

  return (
    <DashboardContext.Provider
      value={{
        editMode: editMode,
        currentDashboard: dashboard,
        onDashboardUpdated: saveDashboard,
        resetDashboard,
        bridge,
        version,
        isDemoMode,
        toggleDemoMode,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};

export const useGeneralSettings = (): GeneralSettingsType | undefined => {
  const { currentDashboard } = useDashboard();
  return currentDashboard?.generalSettings;
};
