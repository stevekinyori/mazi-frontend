import { DeviceData } from "../interfaces/deviceData";
import { DeviceSummary } from "../interfaces/summary";
const baseUrl = 'https://75sofxo9jj.execute-api.us-east-1.amazonaws.com/prod';
export function fetchDeviceData(deviceId: string): Promise<DeviceData> {
    return new Promise<DeviceData>((resolve, reject) => {
      fetch(baseUrl+`/devices/${deviceId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  export function fetchDeviceSummary(): Promise<DeviceSummary> {
    return new Promise<DeviceSummary>((resolve, reject) => {
      fetch(baseUrl+'/summary')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          resolve({
            totalDevices: data.totalDevices,
            activeDevices: data.activeDevices,
            lowBatteryDevices: data.lowBatteryDevices,
            redZoneDevices: data.redZoneDevices,
            highTempDevices: data.highTempDevices,
            highSpeedDevices: data.highSpeedDevices,
            batteryHealthGrouping: data.batteryHealthGrouping
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  export function postMessageToSQS(payload: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(baseUrl+'/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to send message to SQS');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
  
  export function fetchItems(): Promise<DeviceData[]> {
    return new Promise<DeviceData[]>((resolve, reject) => {
      fetch(baseUrl+'/items')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch items');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
  
  export function filterByDeviceId(deviceId: string): Promise<DeviceData[]> {
    return new Promise<DeviceData[]>((resolve, reject) => {
      fetch(baseUrl+`/devices/${deviceId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data for the device');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }