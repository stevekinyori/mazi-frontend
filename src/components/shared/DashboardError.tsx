import React from 'react';
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon';

export default function DashboardError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center my-s-8">
      <ErrorWarningLineIcon size={200} className="text-gray-400" />
      <p className="text-gray-400 text-3xl font-medium mt-s-6">{message}</p>
    </div>
  );
}
