import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import dayjs from 'dayjs';
import LocaleData from 'dayjs/plugin/localeData';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import IsoWeek from 'dayjs/plugin/isoWeek';
import WeekOfYear from 'dayjs/plugin/weekOfYear';

import './assets/styles/index.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';

dayjs.extend(LocaleData);
dayjs.extend(AdvancedFormat);
dayjs.extend(IsoWeek);
dayjs.extend(WeekOfYear);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      staleTime: 6e5,
      cacheTime: 6e5,
      retry: (failureCount, error: any) => failureCount < 1 && error?.response?.status === 500,
      retryOnMount: true,
    },
  },
});

document.getElementById('preloader')?.remove();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#f1491c',
            fontFamily: "'Poppins', sans-serif",
          },
        }}
      >
        <App />
      </ConfigProvider>

      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
