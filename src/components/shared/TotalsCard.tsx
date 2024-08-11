import React from 'react';
import MoreFillIcon from 'remixicon-react/MoreFillIcon';

interface TotalsCardParams {
  loading: boolean;
  total: number;
  label: string;
  icon: React.ReactNode;
  className?: string;
  footer?: {
    label: string;
    value: number;
  };
  smallerText?: boolean;
}

export default function TotalsCard({
  total,
  label,
  icon,
  className,
  loading,
  footer,
  smallerText,
}: TotalsCardParams) {
  return (
    <div className={`@container bg-white drop-shadow-lg rounded-lg overflow-hidden flex flex-col ${className}`}>
      <div className="flex-1 p-s-3 flex flex-col @xs:flex-row items-center justify-center">
        {loading ? (
          <MoreFillIcon />
        ) : (
          <>
            <div className="mr-s-2 text-2xl">
              {icon}
            </div>
            <div
              className={`w-1/2 font-semibold whitespace-nowrap mr-s-2 @xs:text-right
                ${smallerText ? 'text-base' : 'text-2xl mr-s-2 '}  `}
            >
              {total}
            </div>
            <div
              className={`w-1/2 text-gray-500 text-left ${smallerText ? 'text-sm @xs:ml-s-3' : 'text-lg @xs:ml-s-4'} `}
            >
              {label}
            </div>
          </>
        )}
      </div>
      {footer && (
        <p className="bg-blue-100 text-center p-s-1 m-0">
          {footer.label} <span className="font-semibold">{footer.value}</span>
        </p>
      )}
    </div>
  );
}
