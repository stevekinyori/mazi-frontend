export interface DeviceSummary {
    totalDevices: number;
    activeDevices: number;
    lowBatteryDevices: number;
    redZoneDevices: number;
    highTempDevices: number;
    highSpeedDevices: number;
    batteryHealthGrouping: Record<string, number>;
  }