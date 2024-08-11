import React, { useContext, useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import { AppContext, formatDateTime } from '../../helpers';
import { useFetchItemsMutation } from '../../queries/api/api';
import { Link } from 'react-router-dom';

export default function DeviceList() {
  const { contentLoaded } = useContext(AppContext);
  const [deviceData, setDeviceData] = useState([]);
  const [dataPagination, setDataPagination] = useState({
    recordCount: 10,
    recordOffset: 0,
  });

  const columns = [
    {
      title: 'Device ID',
      key: 'deviceId',
      dataIndex: 'deviceId',
      render: (deviceId: string) => (
        <Link
          to={`device/${deviceId}`}
          style={{ color: '#1890ff', cursor: 'pointer' }}
        >
          {deviceId}
        </Link>
      ),
    },
    {
      title: 'Battery Level',
      key: 'batteryLevel',
      dataIndex: 'batteryLevel',
      render: (batteryLevel: number) => `${batteryLevel}%`,
    },
    {
      title: 'Location (Latitude)',
      key: 'locationLat',
      render: (item) => item.location?.latitude || '-',
    },
    {
      title: 'Location (Longitude)',
      key: 'locationLng',
      render: (item) => item.location?.longitude || '-',
    },
    {
      title: 'Speed (km/h)',
      key: 'speed',
      dataIndex: 'speed',
    },
    {
      title: 'Temperature (°C)',
      key: 'temperature',
      dataIndex: 'temperature',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Battery Health Status',
      key: 'batteryHealthStatus',
      dataIndex: 'batteryHealthStatus',
    },
    {
      title: 'Timestamp',
      key: 'timestamp',
      dataIndex: 'timestamp',
      render: (item) => formatDateTime(item),
      sorter: (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    },
  ];

  const { mutate: fetchDeviceData } = useFetchItemsMutation({
    onSuccess: (data) => {
      const orderedData = data.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setDeviceData(orderedData);
    },
    onError: (error) => {
      console.error('Error fetching device data:', error);
      contentLoaded((prevState) => ({ ...prevState, error }));
    },
  });

  useEffect(() => {
    fetchDeviceData();
  }, []);

  return (
    <div className="my-s-3">
      <h2 className="text-xl font-semibold mb-s-1">Device Data</h2>

      <Card bodyStyle={{ padding: '0' }}>
        <Table
          columns={columns}
          dataSource={deviceData}
          rowKey={(record) => `${record.deviceId}-${record.timestamp}`}
          pagination={{
            hideOnSinglePage: true,
            total: deviceData.length,
            pageSize: dataPagination.recordCount,
            current: dataPagination.recordOffset / dataPagination.recordCount + 1,
          }}
          onChange={(pagination) => {
            setDataPagination({
              recordCount: pagination.pageSize ?? dataPagination.recordCount,
              recordOffset: (pagination.current! - 1) * pagination.pageSize!,
            });
          }}
        />
      </Card>
    </div>
  );
}
