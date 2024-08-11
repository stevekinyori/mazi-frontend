import React from 'react';
import MoreFillIcon from 'remixicon-react/MoreFillIcon';

export default function SummaryComponent({
  title,
  subtitle,
  unit,
  loaded,
}: {
  title: string;
  subtitle: string;
  unit?: string;
  loaded: boolean;
}) {
  return (
    <div
      className="flex flex-col px-s-2 py-s-3 bg-white rounded-lg border border-gray-200 shadow-lg text-center
        text-lg"
    >
      {!loaded ? (
        <div className="flex justify-center">
          <MoreFillIcon />
        </div>
      ) : (
        <>
          <p className="font-semibold text-2xl xl:text-3xl">
            {subtitle} {unit}
          </p>

          <p className="mt-s-2 text-gray-600">{title}</p>
        </>
      )}
    </div>
  );
}
