import React, { useEffect, useState } from 'react';
import LargeTotalsCard from '../shared/TotalsCard'; // Adjust the import path accordingly
import { useFetchDeviceSummaryMutation } from '../../queries/api/api';
import DeviceIcon from 'remixicon-react/DeviceLineIcon';
import BatteryLineIcon from 'remixicon-react/BatteryLineIcon';
import ThermometerLineIcon from 'remixicon-react/ThermometerLineIcon';
import SpeedLineIcon from 'remixicon-react/SpeedLineIcon';
import BatteryLowLineIcon from 'remixicon-react/BatteryLowLineIcon';
import AlertLineIcon from 'remixicon-react/AlertLineIcon';
import { DeviceSummary } from '../../interfaces/summary';

export default function SummaryDashboard() {
  const [summaryData, setSummaryData] = useState<DeviceSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { mutate: fetchDeviceSummary } = useFetchDeviceSummaryMutation({
    onSuccess: (data) => {
      setSummaryData(data);
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching summary data:', error);
      setLoading(false);
    },
  });

  useEffect(() => {
    fetchDeviceSummary();
  }, []);

  const cardData = [
    { total: summaryData?.totalDevices ?? 0, label: 'Total Devices', icon: <DeviceIcon />, loading },
    { total: summaryData?.activeDevices ?? 0, label: 'Active Devices', icon: <DeviceIcon style={{ color: 'green' }}/>, loading },
    { total: summaryData?.lowBatteryDevices ?? 0, label: 'Low Battery Devices', icon: <BatteryLowLineIcon style={{ color: 'red' }}/>, loading },
    { total: summaryData?.redZoneDevices ?? 0, label: 'Red Zone Devices', icon: <AlertLineIcon style={{ color: 'red' }}/>, loading },
    { total: summaryData?.highTempDevices ?? 0, label: 'High Temperature Devices', icon: <ThermometerLineIcon style={{ color: 'red' }}/>, loading },
    { total: summaryData?.highSpeedDevices ?? 0, label: 'High Speed Devices', icon: <SpeedLineIcon />, loading },
    { total: summaryData?.batteryHealthGrouping?.good ?? 0, label: 'Good Battery Health', icon: <BatteryLineIcon style={{ color: 'green' }}/>, loading },
    { total: summaryData?.batteryHealthGrouping?.poor ?? 0, label: 'Poor Battery Health', icon: <BatteryLowLineIcon style={{ color: 'red' }}/>, loading },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-4 gap-s-2">
      {cardData.map((card, index) => (
        <LargeTotalsCard
          key={index}
          total={card.total}
          label={card.label}
          icon={card.icon}
          loading={card.loading}
        />
      ))}
    </div>
  );
}
