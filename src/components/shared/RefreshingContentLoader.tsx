import React from 'react';

import Loader from '../../assets/loader.svg';

export default function ContentLoader() {
  return (
    <div className="inset-0 absolute bg-gray-50/70 z-10 flex items-center justify-center text-xl text-gray-500">
      <div className="flex flex-col py-s-4 rounded-md">
        <div className="flex justify-center mb-s-1">
          <img src={Loader} className="h-8 w-auto" alt="Loader" />
        </div>

        <div className="text-center text-xl pl-s-2">Refreshing data...</div>
      </div>
    </div>
  );
}
