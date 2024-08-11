import React from 'react';
import dayjs from 'dayjs';

export default function PageTitle({ title, lastReportDate }: { title: string; lastReportDate: string }) {
  return (
    <div className="mb-s-4">
      <h4 className="text-xl font-semibold mb-s-1">{title}</h4>
      {lastReportDate && (
        <p className="text-gray-600 font-light">Last reported on {dayjs(lastReportDate).format('Do MMMM YYYY')}</p>
      )}
    </div>
  );
}
