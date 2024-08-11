import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { AppContext, RouteSessionStorageKey, useDashboardState, useExcelData } from '../../helpers';
import './dashboard.scss';
import DashboardHeader from '../../components/DashboardHeader';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  BarController,
  BarElement
);

export default function DashboardIndexPage() {
  const nav = useNavigate();

  const { dashboardState, dispatchChange } = useDashboardState();
  const [arabicaData, setArabicaData] = useState<any[]>([]);

  const appContextProps = useMemo(
    () => ({
      contentLoaded: dashboardState.contentLoaded,
      arabicaData,
      setArabicaData,
    }),
    [dashboardState, dispatchChange, arabicaData]
  );
  useEffect(() => {
      dispatchChange({
        type: 'SET_CONTENT_LOADED',
        payload: true,
      });
    }, [dispatchChange]);

  useEffect(() => {
    const saved = localStorage.getItem(RouteSessionStorageKey);

    if (saved) {
      nav(saved);
      localStorage.removeItem(RouteSessionStorageKey);
    }
  }, [nav]);
  return (
    <AppContext.Provider value={appContextProps}>
      <Layout className="h-screen min-h-[400px]">
        <Layout>
          <Layout.Header className="bg-transparent h-max p-0 leading-none text-base">
            <DashboardHeader />
          </Layout.Header>

          <Layout.Content className="p-s-4 overflow-y-auto bg-gray-100 relative">
            <Outlet />
          </Layout.Content>

          <Layout.Footer className="bg-gray-100 text-gray-400 text-center">MaziMob &copy; 2024</Layout.Footer>
        </Layout>
      </Layout>
    </AppContext.Provider>
  );
}
