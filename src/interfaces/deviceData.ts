export interface DeviceData {
    deviceId: string;
    batteryLevel: number;
    location: {
      latitude: number;
      longitude: number;
    };
    speed: number;
    temperature: number;
    status: string;
    batteryHealthStatus: string;
    timestamp: string;
  }