import React from 'react';

import type { Dayjs } from 'dayjs';
import type { ChartData } from 'chart.js';

import Graph from './Graph';

interface GraphCardParams {
  dateRange: [Dayjs, Dayjs];
  dateRangeChange: (val) => void;
  graphData: ChartData;
  originalGraphData?: { [key: string]: { [key: string]: string } };
  title: string;
  yLabel: string;
  stacked: boolean;
  footer?: string;
  footerValue?: (items: any[]) => string;
  legendLabels?: any;
  multilineLabels?: boolean;
}

export default function DashboardGraphCard({
  title,
  graphData,
  originalGraphData,
  footer,
  yLabel,
  stacked,
  footerValue,
  legendLabels,
  multilineLabels,
}: GraphCardParams) {
  return (
    <div className="bg-white rounded border border-gray-200 shadow p-s-2">
      <Graph
        title={title}
        yLabel={yLabel}
        data={graphData}
        originalData={originalGraphData}
        footer={footer}
        stacked={stacked}
        footerValue={footerValue}
        legendLabels={legendLabels}
        multilineLabels={multilineLabels}
      />
    </div>
  );
}
