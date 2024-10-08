import React, { useContext, useState, useEffect, useMemo } from "react";
import { Card, Table } from "antd";
import { AppContext, formatDateTime } from "../../helpers";
import { useFetchItemsMutation } from "../../queries/api/api";
import { Link } from "react-router-dom";
import { DeviceData } from "../../interfaces";
import AppLoader from "../shared/AppLoader";

export default function DeviceList() {
  const { contentLoaded } = useContext(AppContext);
  const [deviceData, setDeviceData] = useState<Array<DeviceData>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataPagination, setDataPagination] = useState({
    recordCount: 10,
    recordOffset: 0,
  });

  const columns = [
    {
      title: "Device ID",
      key: "deviceId",
      dataIndex: "deviceId",
      render: (deviceId: string) => (
        <Link
          to={`device/${deviceId}`}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          {deviceId}
        </Link>
      ),
    },
    {
      title: "Battery Level",
      key: "batteryLevel",
      dataIndex: "batteryLevel",
      render: (batteryLevel: number) => `${batteryLevel}%`,
    },
    {
      title: "Location (Latitude)",
      key: "locationLat",
      render: (item) => item.location?.latitude || "-",
    },
    {
      title: "Location (Longitude)",
      key: "locationLng",
      render: (item) => item.location?.longitude || "-",
    },
    {
      title: "Speed (km/h)",
      key: "speed",
      dataIndex: "speed",
      render:(item)=> parseFloat(item).toFixed(2)
    },
    {
      title: "Temperature (°C)",
      key: "temperature",
      dataIndex: "temperature",
      render:(item)=> parseFloat(item).toFixed(2)
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        if (item === "active") {
          return (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              {item}
            </span>
          );
        } else {
          return (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              {item}
            </span>
          );
        }
      },
    },
    {
      title: "Battery Health Status",
      key: "batteryHealthStatus",
      dataIndex: "batteryHealthStatus",
    },
    {
      title: "Timestamp",
      key: "timestamp",
      dataIndex: "timestamp",
      render: (item) => formatDateTime(item),
      sorter: (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    },
  ];
  const sortedData = useMemo(() => {
    return deviceData.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [deviceData]);

  const { mutate: fetchDeviceData } = useFetchItemsMutation({
    onSuccess: (data) => {
      const orderedData = data.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setIsLoading(false);
      setDeviceData(orderedData);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Error fetching device data:", error);
      contentLoaded((prevState) => ({ ...prevState, error }));
    },
  });

  useEffect(() => {
    setIsLoading(true);
    fetchDeviceData();
    
    const intervalId = setInterval(() => {
      fetchDeviceData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  if(isLoading){
    return <AppLoader message="Loading Data..."></AppLoader>
  }
  return (
    <div className="my-s-3">
      <h2 className="text-xl font-semibold mb-s-1">Device Data</h2>

      <Card bodyStyle={{ padding: "0" }}>
        <Table
          columns={columns}
          dataSource={sortedData}
          rowKey={(record) => `${record.deviceId}-${record.timestamp}`}
          pagination={{
            hideOnSinglePage: true,
            total: sortedData.length,
            pageSize: dataPagination.recordCount,
            current:
              dataPagination.recordOffset / dataPagination.recordCount + 1,
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
